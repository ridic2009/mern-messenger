import doubleTickIcon from "../../assets/img/doubletick.svg";
import tickIcon from "../../assets/img/tick.svg";

import styles from "./index.module.scss";
import { IReadIndicatorProps } from "./types";

export default function ReadIndicator({ isMe, isRead }: IReadIndicatorProps) {
  return (
    <>
      {isMe ? (
        isRead ? (
          <img className={styles.read} src={doubleTickIcon} alt="read" />
        ) : (
          <img className={styles.unread} src={tickIcon} alt="unread" />
        )
      ) : null}
    </>
  );
}
