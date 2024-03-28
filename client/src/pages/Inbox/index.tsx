import { ReactElement, useEffect, useRef } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Dialogs from "../../components/Dialogs";
import Messages from "../../components/Messages";
import ChatInput from "../../components/ChatInput";

import { useAppDispatch } from "../../redux/store";
import { dialogsSelector } from "../../redux/slices/dialogs";
import { fetchUser, userSelector } from "../../redux/slices/user";

import { IUser } from "../../types/user";

import styles from "./index.module.scss";
import UserProfile from "../../components/UserProfile";

export default function Inbox(): ReactElement {
  const dispatch = useAppDispatch();

  const { currentDialog} = useTypedSelector(dialogsSelector);
  const user: IUser = useTypedSelector(userSelector);

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.inbox}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <input
              className={styles.search}
              type="text"
              placeholder="Поиск собеседника"
            />
          </div>

          <div className={styles.dialogsWrap}>
            <Dialogs user={user} />
          </div>

          <UserProfile user={user} />
        </aside>

        <section className={styles.chat}>
          <div className={styles.chatHeader}>
            <div />
            <div className={styles.partner}>
              <h2 className={styles.partnerTitle}>
                {user._id === currentDialog?.initiator._id
                  ? currentDialog.partner.login
                  : currentDialog?.initiator.login}
              </h2>
              <span className={styles.partnerStatus}>онлайн</span>
            </div>
            <div />
          </div>
          <div ref={messageRef} className={styles.chatBodyWrap}>
            <div className={styles.chatBody}>
              <Messages blockRef={messageRef} dialogId={currentDialog?._id} />
            </div>
          </div>
          <ChatInput userId={user._id} dialogId={currentDialog?._id} />
        </section>
      </main>
    </div>
  );
}
