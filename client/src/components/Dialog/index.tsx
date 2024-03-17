import styles from "./index.module.scss";
import doubleTickIcon from "../../assets/img/doubletickblue.svg";
import formatDate from "../../helpers/formatDate";
import { ReactElement } from "react";
import Avatar from "../Avatar";

export default function Dialog({
  user,
  lastMessage,
  unread,
  onSelect,
}: any): ReactElement {
  return (
    <li onClick={onSelect} className={styles.dialog}>
      <Avatar isOnline={user.isOnline} avatar={user.avatar} user={user}/>
      <div className={styles.user}>
        <div className={styles.userHeader}>
          <h3 title={user.fullname}>{user.fullname}</h3>
          <time>{formatDate(lastMessage.created_at)}</time>
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
