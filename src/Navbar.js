/**
 * The main navbar for the adcommet*/
import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/logo.png";
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const navArr = [
    {
      label: "About us",
      href: "/about-us",
    },
    {
      label: "Log in",
      href: "/login"
    }
  ];
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        bgcolor: "#FFF",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={Link}
            href="/"
            sx={{
              cursor: "pointer",
            }}
          >
            <Image
              src={Logo}
              width={540}
              height={140}
              style={{
                height: "56px",
                width: "auto",
              }}
            />
          </Box>
          <Box ml="auto">
            <IconButton
              sx={{
                display: {
                  md: "none",
                  sm: "block",
                },
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </IconButton>
            <Stack
              spacing={1}
              flexWrap="wrap"
              direction={'row'}
              sx={{
                display: {
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              {navArr.map((item, index) => (
                <Button component={Link} href={item?.href} key={index} color='inherit'>
                  {item?.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
          }}
        >
          <List>
            <ListItem>
              <ListItemButton component={Link} href='/'>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            {navArr.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton component={Link} href={item?.href}>
                  <ListItemText>{item?.label}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
