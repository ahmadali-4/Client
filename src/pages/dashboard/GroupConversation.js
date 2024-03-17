import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import "../../global.css";
import { ChatHeader, ChatFooter } from "../../components/GroupChat";
import useResponsive from "../../hooks/useResponsive";
// import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../sections/Dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentGroupMessages,
  selectGroupConversation,
  setCurrentGroupConversation,
  resetCurrentGroupMessages,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";

const GroupConversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { gconversations, gcurrent_messages } = useSelector(
    (state) => state.conversation.group_chat
  );

  const { group_id } = useSelector((state) => state.conversation);
  const groups = useSelector((state) => state.conversation.groups);

  useEffect(() => {
    const current = groups.find((group) => group._id === group_id);
    console.log("current : ", current);
    if (current) {
      console.log(current.messages, "list of messages");
      const data = current.messages;
      dispatch(resetCurrentGroupMessages());
      dispatch(fetchCurrentGroupMessages({ messages: data }));
      console.log(data, "Data");
    }
    dispatch(setCurrentGroupConversation(current));
  }, [dispatch, group_id]);

  console.log("gcurrent messages: ", gcurrent_messages);

  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {gcurrent_messages.map((el, idx) => {
          console.log("inside return: ", el.type);
          if (!el) {
            return null; // Skip null or undefined values
          }
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} />
                  );

                default:
                  console.log("default");
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} />
                  );
              }

            default:
              return console.log("outside");
          }
        })}
      </Stack>
    </Box>
  );
  // return (
  //   <Box p={isMobile ? 1 : 3}>
  //     <Stack spacing={3}>
  //       {gcurrent_messages &&
  //         gcurrent_messages?.map((el, idx) => {
  //           if (!el) {
  //             return null;
  //           }
  //           switch (el.type) {
  //             case "divider":
  //               return <Timeline el={el} />;

  //             case "msg":
  //               switch (el.subtype) {
  //                 case "img":
  //                   return <MediaMsg el={el} menu={menu} key={id} />;

  //                 case "doc":
  //                   return <DocMsg el={el} menu={menu} key={id} />;

  //                 case "Link":
  //                   return <LinkMsg el={el} menu={menu} key={id} />;

  //                 case "reply":
  //                   return <ReplyMsg el={el} menu={menu} key={id} />;

  //                 default:
  //                   return <TextMsg el={el} menu={menu} key={id} />;
  //               }

  //             default:
  //               return <React.Fragment key={id} />;
  //           }
  //         })}
  //     </Stack>
  //   </Box>
  // );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { gcurrent_messages } = useSelector(
    (state) => state.conversation.group_chat
  );

  console.log("gcurrent messages in chatcomponent: ", gcurrent_messages);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [gcurrent_messages]);

  const [reload, setReload] = useState(false);

  // Function to toggle the reload trigger
  const toggleReload = () => {
    setReload(!reload);
  };

  // Reload the component after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleReload();
    }, 3000); // Change the delay to 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, [reload]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*  */}
      <ChatHeader />
      <Box
        className="scrollbar"
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",

          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle>
          <GroupConversation menu={true} isMobile={isMobile} key={reload} />
        </SimpleBarStyle>
      </Box>
      {/*  */}
      <ChatFooter />
    </Stack>
  );
};

export default ChatComponent;

export { GroupConversation };
