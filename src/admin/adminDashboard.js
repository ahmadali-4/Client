import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Menubar from "./components/menuBar";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";

const GeneraladminApp = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* menu Box */}
        {/* <Menubar /> */}
        {/* Conversation */}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}
        >
          <Dashboard />
        </Box>
      </Stack>
    </>
  );
};

export default GeneraladminApp;
