import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import NoChat from "../assets/Illustration/NoChat";

const LoadingScreen = () => {
  return (
    <Stack sx={{ height: "100vh", width: "100%", color: "#000" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#fff",
          borderBottom: "6px solid #0162C4",
        }}
      >
        <Stack
          sx={{ height: "100%" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NoChat />
          <Typography variant="title" fontSize={60}>
            CUI ChatHub
          </Typography>
          <Typography variant="subtitle2" fontSize={20}>
            Chat, laugh, and emoji your way to infinite connections!
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default LoadingScreen;
