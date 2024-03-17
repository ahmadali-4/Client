import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.app.user);
  const name = firstName + " " + lastName;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Handle logout functionality here
    dispatch(LogoutUser());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Admin Panel Text */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {/* User Profile Avatar */}
        <Avatar
          alt="User Avatar"
          src="/path/to/avatar.jpg" // Add your avatar image source
          sx={{ marginRight: 2 }}
        />
        <Typography fontSize={18}>{name}</Typography>

        {/* Logout Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="logout"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
        </IconButton>

        {/* Alternative: Logout Button as Text/Button */}
        {/* <Button color="inherit" onClick={handleLogout}>Logout</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
