import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import user from "../../../api/user";
import { IUser } from "../../../types/user";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const { data } = await user.getMe();
  return data;
});

interface IUserState {
  data: IUser;
  status: string | null;
  token: string | null;
  isAuth: boolean;
}

const initialState: IUserState = {
  data: {
    _id: '',
    email: '',
    login: '',
    password: '',
    confirmed: false,
    confirmed_hash: ''
  },
  status: null,
  token: window.localStorage.getItem("token"),
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
    },
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
          _id: '',
          email: '',
          login: '',
          password: '',
          confirmed: false,
          confirmed_hash: ''
        };
      });
  },
});

export const userSelector = (state: RootState) => state.user.data;

export const { logout } = userSlice.actions;

export default userSlice.reducer;
