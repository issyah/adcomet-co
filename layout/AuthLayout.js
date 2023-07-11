/**
 * Main auth layout*/
import { DonutLargeOutlined, Home, HomeOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import MainDrawer from "../src/MainDrawer";
import Private from "./Private";
import { useContextProvider } from "../context/ContextProvider";
import { useRouter } from "next/router";
import AvatarDropdown from "../src/AvatarDropdown";
import moment from "moment";
export default function AuthLayout(props) {
  const width = 280;
  const { children } = props;
  const {alert,setAlert} = useContextProvider();
  const router = useRouter();
  return (
    <Private>
      <Box display="flex">
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${width}px)`,
            ml: `${width}px`,
            bgcolor: "#FFF",
          }}
          elevation={0}
          color="default"
        >
          <Toolbar>
            <Typography variant='body2'>
              {moment().format('dddd, Do MMM YY')}
            </Typography>
            <Box ml="auto">
              <AvatarDropdown/>
            </Box>
          </Toolbar>
        </AppBar>
        <MainDrawer
          list={[
            {
              label: "Home",
              icon: <HomeOutlined />,
            },
            {
              icon: <DonutLargeOutlined />,
              label: "Analytics",
            },
          ]}
        />
        <Box component={"main"} flexGrow={1} p={3}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Private>
  );
}
