import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");
const initialState = {
  user_data: {
    isLoggedIn: false,
    user: null,
    user_id: "",
    email: "",
    error: false,
  },
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
