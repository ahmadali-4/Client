import React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { useDispatch } from "react-redux";

import { updateSidebarTypeAction } from "../../redux/slices/app";
import MessengerConversation from "../Conversation";

const StartedMess = () => {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(updateSidebarTypeAction("CONTACT"));
  };

  return (
    <Box sx={{ width: "320px", height: "100vh" }}>
      <Stack p={2} direction={"row"} alignItems={"center"}>
        <IconButton onClick={handleBack}>
          <CaretLeft />
        </IconButton>

        <Typography variant="title">Started Message</Typography>
      </Stack>

      <Stack
        sx={{ width: "100%", ml: "10px", height: "82.5%" }}
        alignItems={"center"}
      >
        <Stack
          sx={{
            width: "100%",
            flexGrow: 1,
            position: "relative",
            overflowY: "scroll",
          }}
        >
          {/* render all messages from component Messenger */}
          <MessengerConversation />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StartedMess;
