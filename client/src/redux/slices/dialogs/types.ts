import { IDialog } from "../../../components/Dialog/types";

export interface IDialogsState {
  items: IDialog[];
  currentDialogId: string | null | number;
  status: string;
}

export interface IDialogsSlice {
  items: IDialog[]
}
