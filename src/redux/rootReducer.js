import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer, { LogoutUser } from "./slices/auth";
import conversationReducer from "./slices/conversation";
import groupReducer from "./slices/groupSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = (state, action) => {
  // If the action type is LOGOUT, reset the entire Redux state
  if (action.type === LogoutUser) {
    state = undefined;
  }

  return combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversationReducer,
    group: groupReducer,
  })(state, action);
};

export { rootPersistConfig, rootReducer };
