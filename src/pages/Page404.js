import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import NoChat from "../assets/Illustration/NoChat";

const Page404 = () => {
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
            404 Error:
          </Typography>
          <Typography variant="subtitle2" fontSize={28}>
            Page Not Found.
          </Typography>
          <Typography variant="subtitle2" fontSize={20}>
            Looks like this page is on vacation in another
          </Typography>
          <Typography variant="subtitle2" fontSize={20}>
            dimension. Maybe try refreshing or checking back later?
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Page404;
