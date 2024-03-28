import { ReactElement, useEffect, useRef } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";
import ChatInput from "../../components/ChatInput";

import { useAppDispatch } from "../../redux/store";
import { dialogsSelector } from "../../redux/slices/dialogs";
import { fetchUser, userSelector } from "../../redux/slices/user";

import { IUser } from "../../types/user";

import styles from "./index.module.scss";


export default function Inbox(): ReactElement {
  const dispatch = useAppDispatch();

  const { currentDialog } = useTypedSelector(dialogsSelector);
  const user: IUser = useTypedSelector(userSelector);

  const messageRef = useRef<HTMLDivElement>(null);
  const partnerNickname =
    user._id === currentDialog?.initiator._id
      ? currentDialog.partner.login
      : currentDialog?.initiator.login;

  const partnerStatus = null;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.inbox}>
        <Sidebar user={user} />

        <section className={styles.chat}>
          {currentDialog && (
            <>
              <div className={styles.chatHeader}>
                <div />
                <div className={styles.partner}>
                  {partnerNickname ? (
                    <h2 className={styles.partnerTitle}>{partnerNickname}</h2>
                  ) : (
                    "Выберите диалог"
                  )}
                  {partnerStatus && (
                    <span className={styles.partnerStatus}>
                      {partnerStatus}
                    </span>
                  )}
                </div>
                <div />
              </div>
              <div ref={messageRef} className={styles.chatBodyWrap}>
                <div className={styles.chatBody}>
                  <Messages
                    blockRef={messageRef}
                    dialogId={currentDialog._id}
                  />
                </div>
              </div>
              <ChatInput userId={user._id} dialogId={currentDialog._id} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
