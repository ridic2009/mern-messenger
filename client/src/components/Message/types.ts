export interface IMessageProps {
  author?: string | number;
  time: string;
  text?: string;
  audio?: string;
  avatar: string;
  isMe?: boolean;
  user: {
    _id: string;
    fullname: string;
    avatar: string;
    isOnline: boolean;
  };
  isRead?: boolean;
  isTyping: boolean;
  isUnlistened?: boolean;
}

export interface IMessage {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    avatar?: string;
    isOnline: boolean;
  };
  text: string;
  created_at: string;
  dialog_id: string;
  unread: number;
}
