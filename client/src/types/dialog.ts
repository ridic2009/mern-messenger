import { IUser } from "./user";

export interface IDialog {
  _id: string;
  initiator: IUser;
  partner: IUser;
  lastMessage: {
    _id: string,
    text: string,
    sender: IUser,
    createdAt: string
  };
  unread: number;
}