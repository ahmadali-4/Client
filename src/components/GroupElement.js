import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConversation,
  selectGroupConversation,
} from "../redux/slices/conversation";
import StringAvatar from "./AvatarString";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const GroupElement = ({ img, groupName, text, time, unread, online, _id }) => {
  const dispatch = useDispatch();
  const { group_id } = useSelector((state) => state.conversation);
  
  const selectedChatId = group_id?.toString();

  let isSelected = selectedChatId === _id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();
  const handleRoomId = () => {
    dispatch(selectGroupConversation({ group_id: _id }));
  };

  console.log("Group id: ", _id);
  // const latestMessage = msg?.length > 0 ? msg[msg.length - 1].text : "";

  return (
    <StyledChatBox
      onClick={handleRoomId}
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              {/* <Avatar alt={name} src={img} /> */}
              <StringAvatar name={groupName} />
            </StyledBadge>
          ) : (
            // <Avatar alt={name} src={img} />
            <StringAvatar name={groupName} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{groupName}</Typography>
            <Typography variant="caption">{truncateText(text, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default GroupElement;
