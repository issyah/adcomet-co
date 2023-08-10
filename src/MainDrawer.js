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
  Chip,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../public/logo-white.png";
import Link from "next/link";
export default function MainDrawer(props) {
  const router = useRouter();
  const { list, drawerWidth, mobileOpen, setMobileOpen, children, isOwner } =
    props;
  const [variant, setVariant] = useState("permanent");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleVariantState = (size) => {
    if (size >= 900) {
      setVariant("permanent");
    } else {
      setVariant("temporary");
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      let windowWidth = window.innerWidth;
      handleVariantState(windowWidth);
      window.onresize = function (event) {
        windowWidth = window.innerWidth;
        handleVariantState(windowWidth);
      };
    }
  }, []);
  return (
    <Drawer
      sx={{
        width: drawerWidth ? drawerWidth : 280,
        ".MuiListItem-root": {
          borderRadius: 16,
        },
        ".MuiPaper-root": {
          width: drawerWidth ? drawerWidth : 280,
          bgcolor: "#0c0b2c",
        },
        ".MuiListItemIcon-root, .MuiListItemText-root": {
          color: "grey.400",
        },
        ".Mui-selected": {
          "&:hover": {
            backgroundColor: "rgba(58, 54, 219, 0.5)",
          },
          backgroundColor: "rgba(58, 54, 219, 0.5)",
          ".MuiListItemIcon-root, .MuiListItemText-root": {
            color: "#FFF",
            fontWeight: 500,
          },
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
            px: 2,
          }}
        >
          <ListItem sx={{ mb: 4 }}>
            <Box
              display="flex"
              flexDirection="column"
              gap={0.5}
              sx={{ width: "100%" }}
            >
              <Box position="relative" width={"100%"} height={45} px={3}>
                <Image src={Logo} fill className="img-responsive" />
              </Box>
              <Box textAlign={"center"}>
                <Chip
                  sx={{ color: "grey.100" }}
                  label={isOwner ? "Owner platform" : "Advertiser platform"}
                  variant="outlined"
                />
              </Box>
            </Box>
          </ListItem>
          {list.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={router.pathname.includes(item?.href)}
                // selected={router.pathname == item?.href}
                component={Link}
                href={item?.href}
                onClick={handleDrawerToggle}
              >
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
      {children}
    </Drawer>
  );
}
