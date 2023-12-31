/**
 * Account settings dropdown*/
import {
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Menu,
  Button,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { handleSignOut } from "./firebase-func";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { BusinessCenterOutlined, Group } from "@mui/icons-material";
export default function AvatarDropdown(props) {
  const { list, isAdSpace } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContextProvider();
  const { email } = user;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickSignOut = async () => {
    try {
      const result = await handleSignOut();
    } catch (error) {
      setAlert({
        show: true,
        status: "error",
        message: error?.message,
      });
      return;
    }
  };

  const urlPath = () => {
    return isAdSpace ? "/ad-space/" : "/ad/";
  };

  const menuList = [
    {
      label: "Profile",
      icon: <PermIdentityIcon />,
      attributes: {
        href: urlPath() + "/profile",
        component: Link,
        onClick: handleClose,
      },
    },
    {
      label: "Company",
      icon: <BusinessCenterOutlined />,
      attributes: {
        href: urlPath() + "/company",
        component: Link,
        onClick: handleClose,
      },
    },
    {
      label: "Users",
      icon: <Group />,
      attributes: {
        href: urlPath() + "/users",
        component: Link,
        onClick: handleClose,
      },
    },
    {
      label: "Sign out",
      icon: <ExitToAppIcon />,
      attributes: {
        onClick: clickSignOut,
      },
    },
  ];

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                color: "grey.200",
                textTransform: "uppercase",
              }}
              src={user?.profile?.avatar || undefined}
            >
              {!user?.avatar && email ? email[0] : "A"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        elevation={2}
        sx={{
          ".MuiPaper-root": {
            minWidth: "180px",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 6px 30px",
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Box px={2}>
          <Typography variant="body1">{email}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        {menuList.map((item, index) => (
          <MenuItem key={index} {...item?.attributes}>
            <Box display={"flex"} gap={1}>
              {item?.icon}
              <Typography>{item?.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
