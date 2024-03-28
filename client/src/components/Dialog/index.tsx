import styles from "./index.module.scss";
import doubleTickIcon from "../../assets/img/doubletickblue.svg";
import singleTickIcon from "../../assets/img/tick.svg";
import formatDate from "../../helpers/formatDate";
import { ReactElement } from "react";
import Avatar from "../Avatar";
import { IDialogProps } from "./types";

export default function Dialog({
  currentUser,
  lastMessage,
  unread,
  isUnread,
  initiator,
  partner,
  onSelect,
}: IDialogProps): ReactElement {
  
  const user = currentUser._id === initiator._id ? partner : initiator;

  return (
    <li onClick={onSelect} className={styles.dialog}>
      <Avatar avatar={user.avatar} user={user} />
      <div className={styles.user}>
        <div className={styles.userHeader}>
          <h3 title={user.login}>{user.login}</h3>
          <time>
            {lastMessage ? formatDate(lastMessage.createdAt || "") : ""}
          </time>
        </div>
        <div className={styles.userContent}>
          {lastMessage && (
            <p title={lastMessage.text} className={styles.lastMessage}>
              {lastMessage.text}
            </p>
          )}
          {unread > 0 ? (
            <div className={styles.newMessage}>
              <span>{unread > 9 ? "+" + 9 : unread}</span>
            </div>
          ) : (
            lastMessage &&
            (isUnread ? (
              <img
                className={styles.messageRead}
                src={singleTickIcon}
                alt="read"
              />
            ) : (
              <img
                className={styles.messageRead}
                src={doubleTickIcon}
                alt="read"
              />
            ))
          )}
        </div>
      </div>
    </li>
  );
}
