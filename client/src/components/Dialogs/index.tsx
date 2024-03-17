import { ReactElement } from "react";
import { IDialogsProps } from "./types";

import Dialog from "../Dialog";

import styles from "./index.module.scss";
import { setCurrentDialogId } from "../../redux/slices/dialogs";
import { useAppDispatch } from "../../redux/store";

export default function Dialogs({ items }: IDialogsProps): ReactElement {
  const dispatch = useAppDispatch();

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(b.lastMessage.created_at).getTime() -
      new Date(a.lastMessage.created_at).getTime()
  );

  // const onSelectDialog = (id: string) => console.log("DIALOG ID: " + id);

  return (
    <ul className={styles.dialogs}>
      {sortedItems.map((item) => (
        <Dialog
          key={item.user._id}
          onSelect={() => dispatch(setCurrentDialogId(item._id))}
          {...item}
        />
      ))}
    </ul>
  );
}
