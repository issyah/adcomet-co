/**
 * Reusable drawer*/
import {
  Drawer,
  List,
  ListItem,
  Toolbar,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
export default function MainDrawer(props) {
  const { list, drawerWidth } = props;
  const [mobileOpen, setMobileOpen] = useState(true);
  const [variant, setVariant] = useState("permanent");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    if (typeof window !== undefined) {
    }
  }, []);
  return (
    <Drawer
      sx={{
        width: drawerWidth ? drawerWidth : 280,
        display: {
          xs: "none",
          sm: "none",
          md: "block",
        },
        ".MuiPaper-root": {
          width: drawerWidth ? drawerWidth : 280,
        },
      }}
      variant={variant}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="left"
      elevation={0}
    >
      {list && (
        <List
          sx={{
            px: 3,
          }}
        >
          <ListItem>
            <Box position="relative" width={"100%"} height={56} px={3}>
              <Image src={Logo} fill className="img-responsive" />
            </Box>
          </ListItem>
          {list.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: "32px",
                  }}
                >
                  {item?.icon}
                </ListItemIcon>
                <ListItemText primary={item?.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}
