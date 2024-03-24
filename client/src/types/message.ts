import { IUser } from "./user";

export interface IMessage {
    _id: string;
    user: IUser;
    text: string;
    createdAt: string;
    dialog_id: string;
    unread: number;
  }