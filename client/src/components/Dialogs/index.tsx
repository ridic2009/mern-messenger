import { ReactElement, useEffect } from "react";
import socket from "../../core/socket";

import {
  dialogsSelector,
  fetchDialogs,
  setCurrentDialog,
} from "../../redux/slices/dialogs";
import { useAppDispatch } from "../../redux/store";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Dialog from "../Dialog";

import { IDialogsProps } from "./types";

import styles from "./index.module.scss";

export default function Dialogs({ user }: IDialogsProps): ReactElement {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector(dialogsSelector);

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(b.lastMessage?.createdAt).getTime() -
      new Date(a.lastMessage?.createdAt).getTime()
  );

  useEffect(() => {
    dispatch(fetchDialogs());

    socket.on("server:dialog_create", () => {
      dispatch(fetchDialogs());
    });

    socket.on("server:message_create", () => {
      dispatch(fetchDialogs());
    });
  }, []);

  return (
    <ul className={styles.dialogs}>
      {items.length > 0 ? (
        sortedItems.map((item) => (
          <Dialog
            dialogId={item._id}
            isUnread={true}
            currentUser={user}
            key={item._id}
            onSelect={() => dispatch(setCurrentDialog(item))}
            {...item}
          />
        ))
      ) : (
        <>Диалогов нет</>
      )}
    </ul>
  );
}
