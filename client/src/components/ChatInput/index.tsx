import { useState } from "react";

import messages from "../../api/messages";

import styles from "./index.module.scss";

import { IChatInputProps } from "./types";

export default function ChatInput({ userId, dialogId }: IChatInputProps) {
  const [value, setValue] = useState("");
  const sendMessage = async (
    text: string,
    userId: string,
    dialogId: string | undefined,
    event?: React.KeyboardEvent
  ) => {

    if (dialogId === null) {
      return
    }

    if (event?.key === "Enter" && text.trim() !== "") {
      await messages.send(text, userId, dialogId);
      setValue("");
    }
  };

  return (
    <div className={styles.chatInputWrap}>
      <input
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => sendMessage(value, userId, dialogId, e)}
        className={styles.chatInput}
        type="text"
        placeholder="Напишите сообщение"
        value={value}
      />

      <div className={styles.chatInputOpts}>
        <svg
          className={styles.chatInputOpt}
          viewBox="0 0 1024 1024"
          fill="#000000"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M249.6 367.2c0 36 29.6 65.6 65.6 65.6s65.6-29.6 65.6-65.6-29.6-65.6-65.6-65.6-65.6 29.6-65.6 65.6zM512 790.4c214.4 0 259.2-194.4 259.2-194.4H252.8S297.6 790.4 512 790.4z"
            fill=""
          />
          <path
            d="M512 1010.4c-274.4 0-497.6-224-497.6-498.4S237.6 14.4 512 14.4s498.4 223.2 498.4 498.4-224 497.6-498.4 497.6zM512 68C267.2 68 68 267.2 68 512s199.2 444 444 444 444-199.2 444-444S756.8 68 512 68z"
            fill=""
          />
          <path
            d="M643.2 367.2c0 36 29.6 65.6 65.6 65.6 36 0 65.6-29.6 65.6-65.6s-29.6-65.6-65.6-65.6c-36 0-65.6 29.6-65.6 65.6z"
            fill=""
          />
        </svg>
        <svg
        id="send"
          className={styles.chatInputOpt}
          onClick={() => sendMessage(value, userId, dialogId)}
          width="800px"
          height="800px"
          viewBox="0 -0.5 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
