import { IUser } from "../../types/user";

export interface IMessageProps {
  author?: string | number;
  time: string;
  text?: string;
  audio?: string;
  avatar: string;
  isMe?: boolean;
  user: IUser;
  isRead?: boolean;
  isTyping: boolean;
  isUnlistened?: boolean;
}


