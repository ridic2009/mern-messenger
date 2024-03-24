import { ReactElement } from "react";
import { IDialogsProps } from "./types";

import Dialog from "../Dialog";

import styles from "./index.module.scss";
import { setCurrentDialogId } from "../../redux/slices/dialogs";
import { useAppDispatch } from "../../redux/store";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { userSelector } from "../../redux/slices/user";

export default function Dialogs({ items }: IDialogsProps): ReactElement {
  const dispatch = useAppDispatch();
  const user = useTypedSelector(userSelector)

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(b.lastMessage.createdAt).getTime() -
      new Date(a.lastMessage.createdAt).getTime()
  );

  return (
    <ul className={styles.dialogs}>
      {sortedItems.map((item) => (
        <Dialog
          currentUser={user}
          key={item._id}
          onSelect={() => dispatch(setCurrentDialogId(item._id))}
          {...item}
        />
      ))}
    </ul>
  );
}
