import Chats from "./Chats";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "./Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import NoChat from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((state) => state.app || {});
  const { chat_type, room_id } = useSelector(
    (state) => state.conversation || {}
  );

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chat Box */}
      <Chats />
      {/* Conversation */}
      <Box
        sx={{
          height: "100%",
          width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {chat_type === "individual" && room_id !== null ? (
          <Conversation />
        ) : (
          <Stack
            sx={{ height: "100%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start new one
            </Typography>
          </Stack>
        )}
      </Box>
      {/* Contact */}
      {sideBar.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
