import { IUser } from "../../types/user";

export interface IMessageProps {
  sender: IUser;
  time: string;
  text?: string;
  audio?: string;
  avatar?: string;
  isMe?: boolean;
  isRead?: boolean;
  isTyping?: boolean;
  isUnlistened?: boolean;
}


