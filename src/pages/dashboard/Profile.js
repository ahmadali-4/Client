import React, { useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/settings/ProfileForm";
import NoChat from "../../assets/Illustration/NoChat";
import "../../global.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchMe } from "../../redux/slices/app";

const Profile = () => {
  const theme = useTheme();
  const authToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchMe());
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pane */}
        <Box
          className="scrollbar"
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={2} spacing={2}>
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  navigate("/app");
                }}
              >
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>

              <Typography variant="h4">Profile</Typography>
            </Stack>

            {/* Profile Edit Form */}
            <ProfileForm authToken={authToken} />
          </Stack>
        </Box>

        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
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
    </>
  );
};

export default Profile;
