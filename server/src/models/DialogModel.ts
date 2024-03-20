import mongoose, { Schema } from "mongoose";
import { IDialog } from "../types/Dialog";

const options = {
  timestamps: true,
};

const DialogSchema = new Schema(
  {
    initiator: {type: Schema.Types.ObjectId, ref: "User", required: true},
    partner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    lastMessage: {type: Schema.Types.ObjectId, ref: "Message"},
  },
  options
);

const DialogModel = mongoose.model<IDialog>("Dialog", DialogSchema);

export default DialogModel;
