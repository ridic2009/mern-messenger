import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  addMessage,
  fetchMessages,
  messagesSelector,
} from "../../redux/slices/messages";
import { useAppDispatch } from "../../redux/store";
import Message from "../Message";

import styles from "./index.module.scss";
import { IMessage } from "../../types/message";
import formatDate from "../../helpers/formatDate";
import socket from "../../core/socket";
import { IMessagesProps } from "./types";

export default function Messages({ dialogId, blockRef }: IMessagesProps) {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector(messagesSelector);

  useEffect(() => {
    socket.on("server:message_create", (data) => {
      data.dialog._id === dialogId && dispatch(addMessage(data));
    });
  }, []);

  useEffect(() => {
    dialogId && dispatch(fetchMessages(dialogId));
  }, [dialogId]);

  useEffect(() => {
    blockRef.current?.scrollTo(0, blockRef.current?.scrollHeight);
  }, [items]);

  return items.length > 0 ? (
    items.map((item: IMessage) => (
      <Message time={formatDate(item.createdAt)} {...item} />
    ))
  ) : (
    <div className={styles.emptyMessages}>
      <span>╮( ˘ ､ ˘ )╭</span>
      Нет сообщений!
    </div>
  );
}
