import mongoose, { Schema } from "mongoose";
import IMessage from "../types/Message";

const options = {
  timestamps: true,
}

const MessageSchema = new Schema<IMessage>(
  {
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    text: { type: String, require: Boolean },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required: true },
    unread: { type: Boolean, default: true },
  },
  
  options
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
