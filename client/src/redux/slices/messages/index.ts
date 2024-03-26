import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IMessagesState } from "./types";

import messages from "../../../api/messages";

export const fetchMessages = createAsyncThunk(
  "messages/get",
  async (dialogId: string) => {
    const { data } = await messages.getAllMessagesByDialogId(dialogId);
    return data;
  }
);

const initialState: IMessagesState = {
  items: [],
  status: "",
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.items.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "fullfiled";
    });

    builder.addCase(fetchMessages.rejected, (state) => {
      state.items = [];
      state.status = "rejected";
    });
  },
});

export const messagesSelector = (state: RootState) => state.messages;

export const {addMessage} = messagesSlice.actions;

export default messagesSlice.reducer;
