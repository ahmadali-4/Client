import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../sections/Auth/LoginForm.js";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login To ChatHub</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography>New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
        {/* Login Form */}
        <LoginForm />
      </Stack>
    </>
  );
};

export default Login;
