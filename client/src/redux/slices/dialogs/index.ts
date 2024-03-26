import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { IDialogsState } from "./types";

import dialogs from "../../../api/dialogs";

export const fetchDialogs = createAsyncThunk("dialogs/get", async () => {
  const { data } = await dialogs.getAll();
  return data;
});

const initialState: IDialogsState = {
  items: [],
  currentDialogId: null,
  status: "",
};

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentDialogId(state, action: PayloadAction<string>) {
      state.currentDialogId = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchDialogs.pending, (state) => {
      state.status = "pending";
    }),
      builder.addCase(fetchDialogs.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      }),
      builder.addCase(fetchDialogs.rejected, (state) => {
        state.status = "rejected";
        state.items = [];
      });
  },
});

export const { setCurrentDialogId } = dialogsSlice.actions; // actions

export const dialogsSelector = (state: RootState) => state.dialogs; // state

export default dialogsSlice.reducer;
