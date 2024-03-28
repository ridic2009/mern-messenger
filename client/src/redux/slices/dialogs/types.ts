import { IDialog } from "../../../types/dialog";

export interface IDialogsState {
  items: IDialog[];
  currentDialog: IDialog | null;
  status: string;
}