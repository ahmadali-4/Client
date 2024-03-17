import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {
    gconversations: [],
    gcurrent_conversation: null,
    gcurrent_messages: [],
  },

  groups: [],

  chat_type: null,
  room_id: null,
  group_id: null,
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    updateGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    resetState: (state) => {
      return initialState; // Reset to the initial state
    },

    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id && elm._id.toString() !== user_id
        );
        const formattedTime = new Date(el.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return {
          id: el._id,
          user_id: this_user._id && this_user._id.toString(),
          img: faker.image.avatar(),
          name: `${this_user.firstName} ${this_user.lastName}`,
          msg: el?.text,
          time: el?.created_at,
          unread: 0,
          pinned: false,
          online: this_user.status === "Online",
          // online: false,
          about: this_user?.about,
        };
      });
      state.direct_chat.conversations = list;
    },

    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },

    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },

    resetCurrentMessages: (state) => {
      state.direct_chat.current_messages = [];
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        name: `${el.firstName} ${el.lastName}`,
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = [
        ...state.direct_chat.current_messages,
        ...formatted_messages,
      ];
    },

    addDirectMessages(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    },

    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (el) => el._id && el._id.toString() !== user_id
            );
            const formattedTime = new Date(
              this_conversation.created_at
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return {
              id: this_conversation._id,
              user_id: user._id && user._id.toString(),
              img: faker.image.avatar(),
              name: `${user.firstName} ${user.lastName}`,
              msg: this_conversation.messages.slice(-1)[0].text,
              time: formattedTime,
              unread: 0,
              pinned: false,
              online: user.status === "Online",
              about: user.about,
            };
          }
        }
      );
    },

    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (el) => el._id && el._id.toString() !== user_id
      );
      const formattedTime = new Date(
        this_conversation.created_at
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      state.direct_chat.conversations.push({
        id: this_conversation._id,
        user_id: user._id && user._id.toString(),
        img: faker.image.avatar(),
        name: `${user.firstName} ${user.lastName}`,
        msg: this_conversation.text,
        time: formattedTime,
        unread: 0,
        pinned: false,
        online: user.status === "Online",
        about: user.about,
      });
    },

    fetchGroupConversations(state, action) {
      const list = action.payload.gconversations.map((el) => {
        return {
          id: el._id,
          groupName: el.groupName,
          name: `${el.firstName} ${el.lastName}`,
          img: faker.image.avatar(),
          msg: el.content,
          time: el.time,
          unread: 0,
          pinned: false,
          about: el.about,
        };
      });
      state.group_chat.gconversations = list;
    },

    selectGroupConversation(state, action) {
      state.chat_type = "group";
      state.group_id = action.payload.group_id;
    },

    setCurrentGroupConversation(state, action) {
      state.group_chat.gcurrent_conversation = action.payload;
    },

    resetCurrentGroupMessages: (state) => {
      state.group_chat.gcurrent_messages = [];
    },

    fetchCurrentGroupMessages(state, action) {
      const messages = action.payload.messages;
      console.log("messages: ", messages);
      const formatted_messages = messages.map((message) => ({
        id: message._id, // Assuming 'from' is the unique identifier for messages
        type: "msg",
        subtype: message.type === "Text" ? "text" : "", // Adjust this based on your message type logic
        message: message.text,
        incoming: message.from !== user_id, // Assuming 'user_id' is the current user's ID
        outgoing: message.from === user_id,
        from: message.from,
        created_at: message.created_at,
      }));
      state.group_chat.gcurrent_messages = [
        ...state.group_chat.gcurrent_messages,
        ...formatted_messages,
      ];
    },

    addGroupMessages(state, action) {
      state.group_chat.gcurrent_messages.push(action.payload.message);
    },

    updateGroupConversation(state, action) {
      const this_conversation = action.payload.gconversation;
      state.group_chat.gconversations = state.group_chat.gconversations.map(
        (el) => {
          if (el.id !== this_conversation._id) {
            return el;
          } else {
            return {
              id: this_conversation._id,
              groupName: this_conversation.groupName,
              img: faker.image.avatar(),
              msg: el.messages.slice(-1)[0].text,
              time: "10",
              unread: 0,
              pinned: false,
              about: this_conversation.about,
            };
          }
        }
      );
    },

    addGroupConversation(state, action) {
      const this_conversation = action.payload.gconversation;
      state.group_chat.gconversations.push({
        id: this_conversation._id,
        groupName: this_conversation.groupName,
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
        about: this_conversation.about,
      });
    },
  },
});
export const { resetState } = slice.actions;
export const { updateGroups } = slice.actions;

export default slice.reducer;

export const {
  setCurrentGroupConversation,
  resetCurrentGroupMessages,
  fetchCurrentGroupMessages,
  addGroupMessages,
  updateGroupConversation,
  addGroupConversation,
} = slice.actions;

export const selectGroupConversationAndFetchMessages =
  (group_id) => async (dispatch) => {
    try {
      // Set the selected group ID in the Redux store
      dispatch(selectGroupConversation({ group_id }));

      // Fetch messages for the selected group from the server
      const response = await axios.get(`/user/group-conversations/${group_id}`); // Adjust the API endpoint accordingly
      dispatch(fetchCurrentGroupMessages({ gconversations: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

export const sendGroupMessage =
  ({ group_id, message }) =>
  async (dispatch) => {
    try {
      // Send the message to the server
      await axios.post(`/api/group-conversations/${group_id}/messages`, {
        message,
      }); // Adjust the API endpoint accordingly

      // Dispatch action to update Redux store with the sent message
      dispatch(addGroupMessages({ message }));
    } catch (error) {
      console.error(error);
    }
  };

// Dispatch this action to fetch group conversations
export const fetchGroupConversations = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/group-conversations"); // Adjust the API endpoint accordingly
    dispatch(fetchGroupConversations({ gconversations: response.data }));
    console.log(gconversations);
  } catch (error) {
    console.error(error);
  }
};

export const selectConversation =
  ({ room_id }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.selectConversation({ room_id: room_id }));
    } catch (error) {
      console.log(error);
    }
  };

export const selectGroupConversation =
  ({ group_id }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.selectGroupConversation({ group_id: group_id }));
    } catch (error) {
      console.log(error);
    }
  };

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};

export const updateDirectConversation =
  ({ conversation }) =>
  async (dispatch) => {
    try {
      //
      dispatch(slice.actions.updateDirectConversation({ conversation }));
    } catch (error) {
      console.log(error);
    }
  };

export const addDirectConversation =
  ({ conversation }) =>
  async (dispatch) => {
    try {
      //
      dispatch(slice.actions.addDirectConversation({ conversation }));
    } catch (error) {
      console.log(error);
    }
  };

// export const setCurrentConversation =
//   ({ current_conversation }) =>
//   async (dispatch) => {
//     try {
//       dispatch(slice.actions.setCurrentConversation(current_conversation));
//       console.log(
//         "SetCurrentConversation dishpatched with room_id: " +
//           current_conversation
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const resetCurrentMessages = () => async (dispatch) => {
  try {
    dispatch(slice.actions.resetCurrentMessages());
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentConversation =
  (current_conversation) => async (dispatch) => {
    try {
      dispatch(slice.actions.setCurrentConversation(current_conversation));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchCurrentMessage = (messages) => async (dispatch) => {
  try {
    dispatch(slice.actions.fetchCurrentMessages(messages)); // Remove the curly braces around 'messages'
  } catch (error) {
    console.log(error);
  }
};

export const addDirectMessage =
  ({ message }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.addDirectMessages(message));
    } catch (error) {
      console.log(error);
    }
  };
