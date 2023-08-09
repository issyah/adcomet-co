/**
 * The template for Owner dashboard*/
import { useContextProvider } from "@/context/ContextProvider";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { handlePermissionAuth } from "../common";
import { handleSignOut } from "../firebase-func";
import Private from "./Private";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";
import AvatarDropdown from "../AvatarDropdown";
import MainDrawer from "../MainDrawer";
import { HomeOutlined } from "@mui/icons-material";
export default function AuthOwnerLayout({ children }) {
  const router = useRouter();
  const { accessToken, setLoading, loading, alert, setAlert } =
    useContextProvider();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleAlertClose = () => {
    setAlert({
      open: false,
      message: "",
      status: "",
    });
  };
  useEffect(() => {
    if (accessToken) {
      if (!handlePermissionAuth(accessToken, ["adspace"])) {
        router.replace("/401");
      }
      setLoading(false);
    }
  }, [accessToken]);

  const width = 280;
  return (
    <Private>
      <Head>
        <title>Dashboard | Adcomet </title>
      </Head>
      {loading && (
        <Backdrop open={loading} sx={{ zIndex: 9999 }} variant="transparent">
          <CircularProgress color="primary" size={24} />
        </Backdrop>
      )}
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
          elevation="0"
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
            >
              <Menu />
            </IconButton>
            <Box sx={{ ml: "auto" }}>
              <Stack direction="row" gap={1}>
                <AvatarDropdown isAdSpace />
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <MainDrawer
          isOwner
          list={[
            {
              label: "Home",
              icon: <HomeOutlined />,
              href: "/ad-space/dashboard",
            },
          ]}
          mobileOpen={showDrawer}
          setMobileOpen={setShowDrawer}
        ></MainDrawer>
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
          {children}
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
        </Box>
      </Box>
    </Private>
  );
}
