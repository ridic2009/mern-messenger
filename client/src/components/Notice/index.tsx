import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { INoticeProps } from "./types";

export default function Notice({ title, text, isVisible }: INoticeProps) {
  return (
    <div
      className={`${styles.notice} ${
        isVisible ? styles.noticeVisible : styles.noticeHidden
      }`}
    >
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
