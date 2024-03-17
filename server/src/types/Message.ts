import { Document } from "mongodb";
import { Schema } from "mongoose";

export default interface IMessage extends Document {
    lastMessage: Schema.Types.ObjectId;
    text: { type: string; ref: string; required: boolean };
    sender: { type: Schema.Types.ObjectId | string; ref: string; required: boolean };
    dialog: { type: Schema.Types.ObjectId; ref: string; required: boolean };
    unread: { type: boolean; default: boolean };
}