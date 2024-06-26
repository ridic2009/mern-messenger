import { ReactElement} from "react";

import doubleTickIcon from "../../assets/img/doubletickblue.svg";
import singleTickIcon from "../../assets/img/tick.svg";

import formatDate from "../../helpers/formatDate";
import { IDialogProps } from "./types";

import Avatar from "../Avatar";

import styles from "./index.module.scss";




export default function Dialog({

  currentUser,
  lastMessage,
  unread,
  isUnread,
  initiator,
  partner,
  onClick,
}: IDialogProps): ReactElement {

  const user = currentUser._id === initiator._id ? partner : initiator;

  return (
    <li onClick={onClick} className={styles.dialog}>
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
