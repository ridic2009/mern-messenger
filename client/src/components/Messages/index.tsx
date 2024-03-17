import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchMessages, messagesSelector } from "../../redux/slices/messages";
import { useAppDispatch } from "../../redux/store";
import Message from "../Message";

import styles from "./index.module.scss";

export default function Messages({ dialogId, blockRef }: any) {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector(messagesSelector);

  useEffect(() => {
    dialogId === null ? void 0 : dispatch(fetchMessages(dialogId));
    console.log(blockRef);
  }, [dialogId]);

  useEffect(() => {
    blockRef.current?.scrollTo(0, blockRef.current?.scrollHeight);
  }, [items]);

  return items.length > 0 ? (
    items.map((item: any) => <Message {...item} />)
  ) : (
    <div className={styles.emptyMessages}>
      <span>╮( ˘ ､ ˘ )╭</span>
      Нет сообщений!
    </div>
  );
}
