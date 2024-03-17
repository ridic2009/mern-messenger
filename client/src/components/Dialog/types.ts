export interface IDialog {
    _id: string,
    user: {
      _id: string | number;
      fullname?: string;
      avatar?: string;
      isOnline: boolean;
    };
    lastMessage: {
      text: string;
      created_at: string;
      updated_at: string;
      isRead: boolean;
    };
    unread: number;
  }