/**
 * Main auth layout*/
import {
  DonutLargeOutlined,
  Home,
  HomeOutlined,
  MailOutlineOutlined,
  PinDropOutlined,
  SearchOutlined,
  UploadFileOutlined,
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
} from "@mui/material";
import MainDrawer from "../MainDrawer";
import Private from "./Private";
import { useContextProvider } from "../../context/ContextProvider";
import { useRouter } from "next/router";
import AvatarDropdown from "../AvatarDropdown";
import moment from "moment";
import Head from "next/head";
export default function AuthLayout(props) {
  const width = 280;
  const { children } = props;
  const { alert, setAlert, loading, setLoading } = useContextProvider();
  const router = useRouter();
  const handleAlertClose = () => {
    setAlert({
      open: false,
      message: "",
      status: "",
    });
  };
  return (
    <Private>
      <Head>
        <title>Dashboard | Adcommet</title>
      </Head>
      {loading && (
        <Backdrop open={loading} sx={{zIndex: 9999}}>
          <CircularProgress />
        </Backdrop>
      )}
      <Box display="flex">
        <AppBar
          position="fixed"
          sx={{
            width: {
              md: `calc(100% - ${width}px)`,
              sm: "auto",
            },
            ml: {
              md: `${width}px`,
              ml: "none",
            },
            bgcolor: "#FFF",
          }}
          elevation={0}
          color="default"
        >
          <Toolbar>
            <Typography variant="body2">
              {moment().format("dddd, Do MMM YY")}
            </Typography>
            <Box
              sx={{
                ml: {
                  md: "auto",
                },
              }}
            >
              <Stack direction={"row"}>
                <TextField
                  size="small"
                  placeholder="Search"
                  sx={{
                    ".MuiInputBase-root": {
                      borderRadius: 10,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Create campaign
                </Button>
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
              href: "/dashboard",
            },
            {
              label: "Campaigns",
              icon: <MailOutlineOutlined />,
              href: "/campaigns",
            },
            {
              label: "Ads Locator",
              icon: <PinDropOutlined />,
              href: "/ads-locator",
            },
            {
              icon: <DonutLargeOutlined />,
              label: "Analytics",
              href: "/analytics",
            },
            {
              icon: <UploadFileOutlined />,
              label: "Creatives",
              href: "/creatives",
            },
          ]}
        />
        <Box
          component={"main"}
          flexGrow={1}
          p={3}
          sx={{
            minHeight: "100vh",
            bgcolor: 'grey.100'
          }}
        >
          <Toolbar />
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
