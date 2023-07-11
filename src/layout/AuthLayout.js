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
  InputAdornment
} from "@mui/material";
import MainDrawer from "../MainDrawer";
import Private from "./Private";
import { useContextProvider } from "../../context/ContextProvider";
import { useRouter } from "next/router";
import AvatarDropdown from "../AvatarDropdown";
import moment from "moment";
export default function AuthLayout(props) {
  const width = 280;
  const { children } = props;
  const { alert, setAlert } = useContextProvider();
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
            <Typography variant="body2">
              {moment().format("dddd, Do MMM YY")}
            </Typography>
            <Box ml="auto">
              <Stack spacing={1} direction={"row"}>
                <TextField size='small' placeholder="Search"
                  sx={{
                    '.MuiInputBase-root' : {
                      borderRadius: 10
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchOutlined/>
                      </InputAdornment>
                    )
                  }}
                />
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
              icon: <PinDropOutlined/>,
              href: '/ads-locator'
            },
            {
              icon: <DonutLargeOutlined />,
              label: "Analytics",
              href: "/analytics",
            },
            {
              icon: <UploadFileOutlined/>,
              label: 'Creatives',
              href: '/creatives'
            }
          ]}
        />
        <Box component={"main"} flexGrow={1} p={3} bgcolor='grey.100' sx={{
          minHeight:'100vh'
        }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Private>
  );
}
