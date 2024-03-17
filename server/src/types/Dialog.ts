import { Schema } from "mongoose";
import { Document } from "mongodb";

export interface IDialog extends Document {
  initiator: { type: Schema.Types.ObjectId; ref: string; required: boolean };
  parnter: { type: Schema.Types.ObjectId; ref: string; required: boolean };
  lastMessage: { type: Schema.Types.ObjectId; ref: string };
  messages: [
    {
      type: Schema.Types.ObjectId;
      ref: string;
    }
  ];
}
