import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
// import { faker } from "@faker-js/faker";
// import { ChatList } from "../../data";
import "../../../src/global.css";
import { AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";

const Menubar = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const { users } = useSelector((state) => state.app);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    // For example, clearing user session, redirecting, etc.
    console.log("Logout clicked");
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <List>
            <ListItem button key={"All Users"} onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"All Users"} />
            </ListItem>
            <ListItem
              button
              key={"Suspended Users"}
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary={"Suspended Users"} />
            </ListItem>
          </List>
        </AppBar>
      </Box>
    </>
  );
};

export default Menubar;
