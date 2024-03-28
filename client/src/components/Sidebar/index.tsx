import Dialogs from '../Dialogs';
import UserProfile from '../UserProfile';

import { ISidebarProps } from './types';

import styles from './index.module.scss'

export default function Sidebar({user}: ISidebarProps) {
  return (
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
  );
}
