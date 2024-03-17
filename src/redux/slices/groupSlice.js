import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const initialState = {
  group_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  direct_chat: {}, // Keep your direct chat state as it is
  chat_type: null,
  room_id: null,
};

const groupSlice = createSlice({
  name: "groupConversation",
  initialState,
  reducers: {
    // ... (Keep your existing actions for direct chat)

    fetchGroupConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        return {
          id: el._id,
          groupName: el.groupName,
          img: faker.image.avatar(),
          msg: el.text,
          time: el.time,
          unread: 0,
          pinned: false,
          about: el.about,
        };
      });
      state.group_chat.conversations = list;
    },

    selectGroupConversation(state, action) {
      state.chat_type = "group";
      state.room_id = action.payload.room_id;
    },

    setCurrentGroupConversation(state, action) {
      state.group_chat.current_conversation = action.payload;
    },

    resetCurrentGroupMessages: (state) => {
      state.group_chat.current_messages = [];
    },

    fetchCurrentGroupMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.group_chat.current_messages = [
        ...state.group_chat.current_messages,
        ...formatted_messages,
      ];
    },

    addGroupMessages(state, action) {
      state.group_chat.current_messages.push(action.payload.message);
    },

    updateGroupConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.group_chat.conversations = state.group_chat.conversations.map(
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
      const this_conversation = action.payload.conversation;
      state.group_chat.conversations.push({
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

export const {
  resetState,
  fetchGroupConversations,
  selectGroupConversation,
  setCurrentGroupConversation,
  resetCurrentGroupMessages,
  fetchCurrentGroupMessages,
  addGroupMessages,
  updateGroupConversation,
  addGroupConversation,
} = groupSlice.actions;

export default groupSlice.reducer;
