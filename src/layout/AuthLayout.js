/**
 * Main auth layout*/
import {
  AddOutlined,
  DonutLargeOutlined,
  Home,
  HomeOutlined,
  MailOutlineOutlined,
  PinDropOutlined,
  SearchOutlined,
  UploadFileOutlined,
  AddCircle,
  Cloud,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Stack,
  InputAdornment,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Divider,
} from "@mui/material";
import MainDrawer from "@/src/MainDrawer";
import Private from "@/layout/Private";
import Link from "next/link";
import { useContextProvider } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import AvatarDropdown from "@/src/AvatarDropdown";
import moment from "moment";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchDialog from "@/src/SearchDialog";
import { Menu } from "@mui/icons-material";
import {
  handleResendVerificationEmail,
  handleSignOut,
} from "@/src/firebase-func";
import CreativeStorageSpace from "@/src/CreativeStorageSpace";
import { handlePermissionAuth } from "@/src/common";
export default function AuthLayout(props) {
  const width = 280;
  const { children } = props;
  const { alert, setAlert, loading, setLoading, user, accessToken } =
    useContextProvider();
  const [showDrawer, setShowDrawer] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const router = useRouter();
  const handleAlertClose = () => {
    setAlert({
      open: false,
      message: "",
      status: "",
    });
  };

  const handleClickResendVerificationEmail = async () => {
    setLoading(true);
    const { result, error } = await handleResendVerificationEmail();
    if (error) {
      setAlert({
        open: true,
        message: error?.message,
        status: "error",
      });
      setLoading(false);
      return;
    }
    // success
    setAlert({
      open: true,
      message:
        "Verification email sent! Please check your inbox, newsletter and spam mail for the email.",
      status: "success",
    });
    setLoading(false);
  };

  useEffect(() => {
    if (accessToken) {
      if (!handlePermissionAuth(accessToken, ["advertiser"])) {
        router.replace("/401");
      }
    }
  }, [accessToken]);

  return (
    <Private>
      <Head>
        <title>Dashboard | Adcomet</title>
      </Head>
      {loading && (
        <Backdrop open={loading} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}
      <SearchDialog open={openSearchDialog} setOpen={setOpenSearchDialog} />
      <Box display="flex">
        <AppBar
          position="fixed"
          sx={{
            width: {
              lg: `calc(100% - ${width}px)`,
              md: "100%",
            },
            ml: {
              lg: `${width}px`,
              md: "auto",
            },
            bgcolor: "#FFF",
          }}
          elevation={0}
          color="default"
        >
          <Toolbar>
            <Typography
              variant="body2"
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                },
              }}
            >
              {moment().format("dddd, Do MMM YY")}
            </Typography>
            <IconButton
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                },
              }}
              onClick={() => setShowDrawer(!showDrawer)}
            >
              <Menu />
            </IconButton>
            <Box
              sx={{
                ml: "auto",
              }}
            >
              <Stack direction={"row"} gap={1}>
                {/* <TextField
                  size="small"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                /> */}
                <Tooltip title="Search">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      minWidth: "46px",
                      p: 0,
                    }}
                    onClick={() => setOpenSearchDialog(true)}
                  >
                    <SearchOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Create new campaign">
                  <Button
                    component={Link}
                    href="/ad/campaigns/create-campaign"
                    variant="outlined"
                    color="primary"
                    sx={{
                      minWidth: "46px",
                      p: 0,
                    }}
                  >
                    <AddCircle />
                  </Button>
                </Tooltip>
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Create campaign
                </Button> */}
                <AvatarDropdown />
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <MainDrawer
          list={[
            {
              label: "Home",
              icon: <HomeOutlined />,
              href: "/ad/dashboard",
            },
            {
              label: "Campaigns",
              icon: <MailOutlineOutlined />,
              href: "/ad/campaigns",
            },
            {
              label: "Ads Locator",
              icon: <PinDropOutlined />,
              href: "/ad/ads-locator",
            },
            {
              icon: <DonutLargeOutlined />,
              label: "Analytics",
              href: "/ad/analytics",
            },
            {
              icon: <UploadFileOutlined />,
              label: "Creatives",
              href: "/ad/creatives",
            },
          ]}
          mobileOpen={showDrawer}
          setMobileOpen={setShowDrawer}
        >
          <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,.1)" }} />
          <CreativeStorageSpace />
          <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,.1)" }} />
        </MainDrawer>
        <Box
          component={"main"}
          flexGrow={1}
          p={3}
          sx={{
            minHeight: "100vh",
            bgcolor: "grey.100",
          }}
        >
          <Toolbar />
          {/* If user not verified */}
          {user && !user?.emailVerified && (
            <Alert
              severity="warning"
              sx={{
                alignItems: "center",
              }}
            >
              Your account is not verified. Please verify your email using the
              email we have sent you. Didn't receive the email?{" "}
              <Button
                onClick={handleClickResendVerificationEmail}
                color="inherit"
              >
                Resend verification email.
              </Button>
            </Alert>
          )}
          {alert?.open && (
            <Snackbar
              open={alert?.open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              autoHideDuration={5000}
              onClose={handleAlertClose}
            >
              <Alert
                severity={alert?.status}
                onClose={handleAlertClose}
                sx={{ width: "100%" }}
              >
                {alert?.message}
              </Alert>
            </Snackbar>
          )}
          {children}
        </Box>
      </Box>
    </Private>
  );
}
