import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import user from "../../../api/user";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const { data } = await user.getMe();
  return data;
});

const initialState = {
  data: {},
  status: "",
  token: window.localStorage.getItem('token'),
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.token = window.localStorage.getItem('token')
        state.isAuth = true
      }),
      builder.addCase(fetchUser.rejected, (state) => {
        state.status = "rejected";
        state.data = {};
      });
  },
});

export const userSelector = (state: RootState) => state.user.data;

export const {} = userSlice.actions;

export default userSlice.reducer;
