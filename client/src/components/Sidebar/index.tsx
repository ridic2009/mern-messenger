import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { findUsers, setSearchValue } from "../../redux/slices/search";

import Dialogs from "../Dialogs";
import UserProfile from "../UserProfile";
import SearchResult from "../SearchResult";

import { ISidebarProps } from "./types";
import debounce from "../../helpers/debounce";

import styles from "./index.module.scss";


export default function Sidebar({ user }: ISidebarProps) {
  const [searchbarValue, setSearchbarValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      str.length > 0 && dispatch(findUsers(str));
    }, 700),
    []
  );

  const clearSearchBar = () => {
    setIsSearching(false)
    setSearchbarValue("")
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchbarValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchbarValue.length > 0  && inputRef.current?.focus) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchbarValue]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <input
          ref={inputRef}
          className={styles.search}
          type="text"
          placeholder="Поиск собеседника"
          onChange={(e) => search(e)}
          value={searchbarValue}
        />
      </div>
      {isSearching && (
        <span className={styles.searchResultTitle}>Результаты поиска</span>
      )}
      <div
        className={
          isSearching
            ? `${styles.sidebarBody} ${styles.userSearching}`
            : styles.sidebarBody
        }
      >
        {/* <Dialogs user={user} /> */}

        {isSearching ? (
          <SearchResult clearSearchBar={clearSearchBar}/>
        ) : (
          <Dialogs user={user} />
        )}
      </div>

      <UserProfile user={user} />
    </aside>
  );
}
