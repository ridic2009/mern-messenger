import { ReactElement, useEffect } from "react";

import Dialog from "../Dialog";

import styles from "./index.module.scss";
import {
  dialogsSelector,
  fetchDialogs,
  setCurrentDialogId,
} from "../../redux/slices/dialogs";
import { useAppDispatch } from "../../redux/store";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { userSelector } from "../../redux/slices/user";
import socket from "../../core/socket";

export default function Dialogs(): ReactElement {
  const dispatch = useAppDispatch();
  const user = useTypedSelector(userSelector);
  const { items } = useTypedSelector(dialogsSelector);

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(b.lastMessage.createdAt).getTime() -
      new Date(a.lastMessage.createdAt).getTime()
  );

  useEffect(() => {
    dispatch(fetchDialogs());

    socket.on("server:dialog_create", data => {
      console.log(data);
      
      dispatch(fetchDialogs());
    });
  }, []);

  return (
    <ul className={styles.dialogs}>
      {items.length > 0 ? (
        sortedItems.map((item) => (
          <Dialog
            currentUser={user}
            key={item._id}
            onSelect={() => dispatch(setCurrentDialogId(item._id))}
            {...item}
          />
        ))
      ) : (
        <>Диалогов нет</>
      )}
    </ul>
  );
}
