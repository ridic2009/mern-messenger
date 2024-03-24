import styles from "./index.module.scss";
import doubleTickIcon from "../../assets/img/doubletickblue.svg";
import formatDate from "../../helpers/formatDate";
import { ReactElement } from "react";
import Avatar from "../Avatar";
import { IDialogProps } from "./types";

export default function Dialog({
  currentUser,
  lastMessage,
  unread,
  initiator,
  partner,
  onSelect,
}: IDialogProps): ReactElement {

  // const user = если id залогиненого юзера === id инициатора диалога, значит нужно отобразить данные партнера и наоборот, 
  // если id залогиненного юзера === id партнера инициатора диалога, значит залогиненый юзер это партнер и нужно отображать
  // данные инициатора диалога

  const user = currentUser._id === initiator._id ? partner : initiator

  return (
    <li onClick={onSelect} className={styles.dialog}>
      <Avatar avatar={user.avatar} user={user} />
      <div className={styles.user}>
        <div className={styles.userHeader}>
          <h3 title={user.login}>{user.login}</h3>
          <time>{formatDate(lastMessage.createdAt || '')}</time>
        </div>
        <div className={styles.userContent}>
          <p title={lastMessage.text} className={styles.lastMessage}>
            {lastMessage.text}
          </p>
          {unread > 0 ? (
            <div className={styles.newMessage}>
              <span>{unread > 9 ? "+" + 9 : unread}</span>
            </div>
          ) : (
            <img
              className={styles.messageRead}
              src={doubleTickIcon}
              alt="read"
            />
          )}
        </div>
      </div>
    </li>
  );
}
