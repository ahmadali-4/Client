import {
  Stack,
  Box,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
// import { ChatList } from "../../data";
import "../../../src/global.css";
import CreateGroup from "../../sections/main/CreateGroup";
import GroupConversation from "./GroupConversation";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../../components/GroupContact";
import GroupElement from "../../components/GroupElement";
import { useEffect } from "react";
// import { fetchGroupData } from "../../redux/slices/groupSlice";
import { FetchGroups } from "../../redux/slices/app";

const Group = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { sideBar } = useSelector((store) => store.app);
  const [openDialog, setOpenDialog] = useState(false);
  // const dispatch = useDispatch();
  // const { groups } = useSelector((store) => store.app);
  const user_id = window.localStorage.getItem("user_id");

  console.log(user_id);

  const dispatch = useDispatch();
  const groups = useSelector((state) => state.conversation.groups);

  useEffect(() => {
    // Fetch groups when the component mounts
    dispatch(FetchGroups());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const theme = useTheme();

  const filteredChatList = groups.filter((groupName) =>
    groupName.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              className="scrollbar"
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
            >
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                {/* <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack> */}
                {/* Chat List */}
                {searchQuery === "" && (
                  <Stack spacing={2.4}>
                    <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                      All Chats
                    </Typography>
                    {groups.length > 0 &&
                      groups.map((group) => (
                        <GroupElement key={group._id} {...group} />
                      ))}
                    {/* {groups.map((group) => (
                      <div key={group._id}>{group._id}</div>
                      // Adjust the property (e.g., 'name') based on your Group model
                    ))} */}
                  </Stack>
                )}

                {/* Filtered Chat List */}
                {searchQuery !== "" && (
                  <Stack spacing={2.4}>
                    {filteredChatList.map((group) => (
                      <GroupElement key={group._id} {...group} />
                    ))}
                  </Stack>
                )}

                {/* ... */}
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
        {/* REUSE CONVERSATION COMPONENT */}
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
          <GroupConversation />
        </Box>
        {sideBar.open && <Contact />}
      </Stack>

      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Group;
