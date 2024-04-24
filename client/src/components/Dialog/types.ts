import { IUser } from "../../types/user";

export interface IDialogProps {
  dialogId: string;
  currentUser: IUser;
  lastMessage: {
    _id: string;
    text: string;
    sender: IUser;
    createdAt: string;
  };
  initiator: IUser;
  partner: IUser;
  unread: number;
  isUnread: boolean
  onClick: () => void;
}
