import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";

import useResponsive from "../../hooks/useResponsive";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import StringAvatar from "../AvatarString";
// import { StartAudioCall } from "../../redux/slices/audioCall";
// import { StartVideoCall } from "../../redux/slices/videoCall";

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

const Conversation_Menu = [
  {
    title: "Group info",
  },
  {
    title: "Clear messages",
  },
  {
    title: "Delete chat",
  },
];

const ChatHeader = () => {
  const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();
  const { group_id } = useSelector((state) => state.conversation);
  const groups = useSelector((state) => state.conversation.groups);

  const currentGroup = groups.find((group) => group._id === group_id);

  const groupMembers = currentGroup?.members || [];
  const initialMembersToShow = 2;

  let displayedMembers = groupMembers.slice(0, initialMembersToShow);
  const remainingMembersCount = groupMembers.length - initialMembersToShow;

  const displayedMembersNames = displayedMembers
    .map((member) => member.name)
    .join(", ");

  // console.log("Current Group: ", currentGroup);

  // const status = gcurrent_conversation?.online ? "Online" : "Offline";
  // let status = "Offline";
  // if (current_conversation !== null) {
  //   if (current_conversation.online !== true) {
  //     status = "Offline";
  //   } else {
  //     status = "Online";
  //   }
  // }

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };

  const handleContactInfoClick = () => {
    // Dispatch ToggleSidebar action when "Contact info" is clicked
    dispatch(ToggleSidebar());
    handleCloseConversationMenu(); // Close the conversation menu
  };

  return (
    <>
      <Box
        p={2}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
        >
          <Stack
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <Box>
              <StringAvatar name={currentGroup?.groupName} />
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="body1" fontSize={18} fontWeight={"bold"}>
                {currentGroup?.groupName}
              </Typography>
              <Typography variant="caption">
                {displayedMembersNames}
                {remainingMembersCount > 0 &&
                  `, +${remainingMembersCount} more`}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={isMobile ? 1 : 3}
          >
            {/* <IconButton
            // onClick={() => {
            //   dispatch(StartVideoCall(current_conversation.user_id));
            // }}
            >
              <VideoCamera />
            </IconButton>
            <IconButton
            // onClick={() => {
            //   dispatch(StartAudioCall(current_conversation.user_id));
            // }}
            >
              <Phone />
            </IconButton> */}
            {!isMobile && (
              <IconButton>
                <MagnifyingGlass />
              </IconButton>
            )}
            <Divider orientation="vertical" flexItem />
            <IconButton
              id="conversation-positioned-button"
              aria-controls={
                openConversationMenu
                  ? "conversation-positioned-menu"
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={openConversationMenu ? "true" : undefined}
              onClick={handleClickConversationMenu}
            >
              <CaretDown />
            </IconButton>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              TransitionComponent={Fade}
              id="conversation-positioned-menu"
              aria-labelledby="conversation-positioned-button"
              anchorEl={conversationMenuAnchorEl}
              open={openConversationMenu}
              onClose={handleCloseConversationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={1}>
                <Stack spacing={1}>
                  {Conversation_Menu.map((el) => (
                    <MenuItem
                      onClick={
                        el.title === "Group info"
                          ? handleContactInfoClick
                          : handleCloseConversationMenu
                      }
                    >
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <span>{el.title}</span>
                      </Stack>{" "}
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ChatHeader;
