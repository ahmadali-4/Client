import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { updateGroups } from "./conversation";

// ----------------------------------------------------------------------

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: "CONTACT" || "GROUPCONTACT", // can be CONTACT, STARRED, SHARED
  },
  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  users: [], // all users of app who are not friends and not requested yet
  all_users: [],
  friends: [], // all friends
  friendRequests: [], // all friend requests
  chat_type: null,
  room_id: null,
  group_id: null,
  groups: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetApp: (state) => {
      return initialState; // Reset to the initial state
    },
    // Toggle Sidebar
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateAllUsers(state, action) {
      state.users = action.payload.all_users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.requests;
    },
    updateSocket(state, action) {
      state.socket = action.payload.socket;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateGroups(state, action) {
      state.groups = action.payload.groups;
    },
  },
});

// Reducer
export const { resetApp } = slice.actions;
export default slice.reducer;

// ----------------------------------------------------------------------

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSideBarType({ type }));
  };
}
export function UpdateTab(tab) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateTab({ tab }));
  };
}

export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchAllUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-all-users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateAllUsers({ all_users: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-friends",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-requests",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateFriendRequests({ requests: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const SelectConversation = ({ room_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

// export function updateSocket(socket) {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.updateSocket({ socket }));
//   };
// }
export function FetchMe() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-me",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        const userData = response.data.data;
        console.log(userData);
        // Process the user data here
        dispatch(slice.actions.fetchUser({ user: userData })); // Update the user data in the Redux state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
}

export const UpdateUserProfile = (formValues) => {
  return async (dispatch, getState) => {
    const file = formValues.avatar;

    // const key = v4();

    try {
      // S3.getSignedUrl(
      //   "putObject",
      //   { Bucket: S3_BUCKET_NAME, Key: key, ContentType: `image/${file.type}` },
      //   async (_err, presignedURL) => {
      //     await fetch(presignedURL, {
      //       method: "PUT",
      //       body: file,
      //       headers: {
      //         "Content-Type": file.type,
      //       },
      //     });
      //   }
      // );
    } catch (error) {
      console.log(error);
    }

    axios
      .patch(
        "/user/update-me",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export function CreateGroup() {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/user/create",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        const userData = response.data.data;
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
}

export function FetchGroups() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/user/get-groups", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      console.log("I am response: ", response.data.data);
      dispatch(updateGroups({ groups: response.data.data }));
    } catch (error) {
      console.error(error);
    }
  };
}
