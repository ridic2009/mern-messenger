import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import user from "../../../api/user";

import { IUserState } from "./types";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const { data } = await user.getMe();
  return data;
});

const initialState: IUserState = {
  data: {
    _id: "",
    email: "",
    login: "",
    password: "",
    confirmed_hash: "",
    confirmed: false,
    isOnline: false,
  },
  status: null,
  token: "" || null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.token = null;
      window.localStorage.removeItem("token");
      window.location.reload();
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.token = window.localStorage.getItem("token");
        state.isAuth = true;
      }),
      builder.addCase(fetchUser.rejected, (state) => {
        state.status = "rejected";
        state.data = {
          _id: "",
          email: "",
          login: "",
          password: "",
          confirmed_hash: "",
          confirmed: false,
          isOnline: false,
        };
        delete window.localStorage.token;
      });
  },
});

export const userSelector = (state: RootState) => state.user.data;

export const { logout } = userSlice.actions;

export default userSlice.reducer;
