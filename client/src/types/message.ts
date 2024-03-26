import { IDialog } from "./dialog";
import { IUser } from "./user";

export interface IMessage {
  _id: string;
  text: string;
  createdAt: string;
  dialog: IDialog;
  sender: IUser;
  unread: boolean;
}
