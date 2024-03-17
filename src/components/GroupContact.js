import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  SignOut,
  UserPlus,
  Star,
  Trash,
  X,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
// import AntSwitch from "../../src/components/AntSwitch";
import "../../src/global.css";
import StringAvatar from "./AvatarString";
import { useState } from "react";
import AddGroupMembers from "../sections/main/AddGroupMember";
import axios from "../utils/axios";

const Contact = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const [openDialog, setOpenDialog] = useState(false);

  const { group_id } = useSelector((state) => state.conversation);
  const groups = useSelector((state) => state.conversation.groups);
  const currentGroup = groups.find((group) => group._id === group_id);
  const groupMembers = currentGroup.members;
  const user_id = window.localStorage.getItem("user_id");

  const getUserObjectId = () => {
    console.log("groupMembers:", groupMembers);
    console.log("user_id:", user_id);

    // Iterate through the group members to find the matching user_id
    for (let i = 0; i < groupMembers.length; i++) {
      if (groupMembers[i].id === user_id) {
        // Found the user, log and return its object ID
        console.log("User's Object ID in the group:", groupMembers[i]._id);
        return groupMembers[i]._id; // Assuming _id is the object ID of the user
      }
    }
    // Return null if user is not found in the group members
    console.log("User not found in group members");
    return null;
  };

  // Get the object ID of the user in the current group
  const userObjectId = getUserObjectId();

  // Use the obtained userObjectId as needed in your application
  console.log("User's Object ID in the group:", userObjectId);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleLeaveGroup = async (groupId, userId) => {
    try {
      const response = await axios.post(`/user/groups/${groupId}/leave`, {
        userId: userId,
      });

      if (response.status === 200) {
        // Handle success, e.g., show a success message or update UI
        console.log("Left the group successfully");
        // Optionally update the UI or perform any action after leaving the group
      } else {
        // Handle error response from the server
        console.error("Error leaving group:", response.statusText);
      }
    } catch (error) {
      console.error("Error leaving group:", error.message);
      // Handle other errors, e.g., network issues
    }
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            spacing={3}
          >
            <Typography varient="subtitle2">Group Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          className="scrollbar"
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Stack alignItems={"center"} direction="column" spacing={2}>
            {/* <Avatar
              src={current_conversation.img}
              alt={faker.name.firstName()}
              sx={{ height: 54, width: 54 }}
            /> */}
            <Box
              sx={{
                height: "360",
                width: "360",
              }}
            >
              <StringAvatar name={currentGroup?.groupName} />
            </Box>
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {currentGroup?.groupName}
              </Typography>
              {/* <Typography variant="body2" fontWeight={500}>
                {"+92 314 00001212"}
              </Typography> */}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-evenly"}
          >
            <Stack alignItems={"center"} spacing={1}>
              <IconButton>
                <UserPlus size={28} onClick={handleOpenDialog} />
              </IconButton>
            </Stack>

            <Stack alignItems={"center"} spacing={1}>
              <IconButton>
                <SignOut
                  size={28}
                  onClick={() => handleLeaveGroup(group_id, user_id)}
                />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={1}>
            <Typography variant="article" fontWeight={600}>
              Group Members
            </Typography>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {groupMembers.map((member, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <StringAvatar name={member.name} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
          </Stack>
          <Divider />
          {/* <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media, Links & Docs</Typography>
            <Button endIcon={<CaretRight />}>401</Button>
          </Stack>
          <Stack direction={"row"} alignItems="center" spacing={2}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.city()} alt={faker.internet.userName()} />
              </Box>
            ))}
          </Stack> */}
          {/* <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>

            <IconButton>
              <CaretRight />
            </IconButton>
          </Stack> */}
          {/* <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>

            <AntSwitch />
          </Stack> */}
          <Divider />
          {/* <Typography variant="body2">1 group in common</Typography> */}
          {/* <Stack direction="row" alignItems={"center"} spacing={2}>
            <Avatar src={faker.image.imageUrl()} alt={faker.name.fullName()} />
            <Stack direction="column" spacing={0.5}>
              <Typography variant="subtitle2">Camel’s Gang</Typography>
              <Typography variant="caption">
                Owl, Parrot, Rabbit , You
              </Typography>
            </Stack>
          </Stack>
          <Divider /> */}
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {/* <Button fullWidth startIcon={<UserCirclePlus />} variant="outlined">
              Add
            </Button> */}
            <Button fullWidth startIcon={<Trash />} variant="outlined">
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openDialog && (
        <AddGroupMembers open={openDialog} handleClose={handleCloseDialog} />
      )}
    </Box>
  );
};

export default Contact;
