import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
  useMediaQuery,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  User,
  Users,
} from "phosphor-react";
import { styled, alpha, useTheme } from "@mui/material/styles";
// import { faker } from "@faker-js/faker";
// import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar.js";
import "../../../src/global.css";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { useEffect } from "react";
import { socket, connectSocket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";

const Chats = () => {
  const user_id = window.localStorage.getItem("user_id");
  // const { sideBar } = useSelector((store) => store.app);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (user_id && socket) {
  //         // Connect socket and emit event to fetch conversations
  //         connectSocket(user_id);

  //         socket.emit("get_direct_conversations", { user_id }, (data) => {
  //           console.log("Received conversations data:", data);
  //           // Dispatch action to store conversations in Redux state
  //           dispatch(FetchDirectConversations({ conversations: data }));
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching conversations:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, user_id]);

  // useEffect(() => {
  //   connectSocket(user_id);
  //   // console.log("I am socket");

  //   if (user_id) {
  //     connectSocket(user_id);
  //     console.log("Socket connected");

  //     socket?.emit("get_direct_conversations", { user_id }, (data) => {
  //       console.log("Received conversations data:", data);
  //       dispatch(FetchDirectConversations({ conversations: data }));
  //     });
  //   }

  //   return () => {
  //     // Assuming you have a "disconnect" event on the server side to handle disconnect
  //     // socket.emit("end");
  //   };
  // }, [dispatch, user_id]);

  useEffect(() => {
    if (user_id) {
      socket?.emit("get_direct_conversations", { user_id }, (data) => {
        console.log(data); // this data is the list of conversations
        // dispatch action

        dispatch(FetchDirectConversations({ conversations: data }));
      });
    }
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const filteredChatList = conversations.filter((name) =>
    name.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          width: isSmallScreen ? "100%" : 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          {/* Chat Taxt + Status Circle */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spaceing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          {/* Search Bar */}
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

          {/* Archive Button + Icon */}
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems="center" spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
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
                  {conversations
                    .filter((el, index) => !el.pinned)
                    .map((el) => (
                      <ChatElement key={el.id} {...el} />
                    ))}
                  {/* {conversations.map((chatRoom) => (
                    <ChatElement key={chatRoom.id} {...chatRoom} />
                  ))} */}
                </Stack>
              )}

              {/* Filtered Chat List */}
              {searchQuery !== "" && (
                <Stack spacing={2.4}>
                  {filteredChatList.map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
                </Stack>
              )}

              {/* ... */}
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
