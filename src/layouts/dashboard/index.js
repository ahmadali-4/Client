import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { socket, connectSocket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addDirectMessage,
  addDirectConversation,
  updateDirectConversation,
  selectConversation,
  FetchDirectConversations,
} from "../../redux/slices/conversation";
import { FetchMe, showSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location = window.location + "#loaded";
      //     window.location.reload();
      //   }
      // };

      // window.onload();

      dispatch(FetchMe());

      if (!socket) {
        connectSocket(user_id);
      }
      socket?.on("new_friend_request", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          })
        );
      });

      socket?.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            addDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      socket?.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          })
        );
      });

      socket?.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket?.on("start_chat", (data) => {
        console.log("start_chat", data);

        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );

        if (existing_conversation) {
          // updaate direct conversation
          dispatch(updateDirectConversation({ conversation: data })); // params: conversation
        } else {
          // add direct conversation
          dispatch(addDirectConversation({ conversation: data }));
        }
        dispatch(selectConversation({ room_id: data._id }));
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket, conversations, dispatch, user_id]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction={"row"}>
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
