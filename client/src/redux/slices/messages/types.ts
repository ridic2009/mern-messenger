import { IMessage } from "../../../components/Message/types";

export interface IMessagesState {
  items: IMessage[];
  status: string;
}
