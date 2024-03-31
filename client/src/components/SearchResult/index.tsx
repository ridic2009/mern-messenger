import { useDispatch } from "react-redux";

import dialogs from "../../api/dialogs";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { searchItemsSelector } from "../../redux/slices/search";
import { setCurrentDialog } from "../../redux/slices/dialogs";

import { IUser } from "../../types/user";
import { ISearchResultProps } from "./types";

import styles from "./index.module.scss";


export default function SearchResult({clearSearchBar}: ISearchResultProps) {

  const items = useTypedSelector(searchItemsSelector);
  const userId = useTypedSelector((state) => state.user.data._id);

  const dispatch = useDispatch()

  const createDialog = async (partnerId: string) => {
    console.log("тут должен улетать запрос на создание диалога");

    try {
      const {data} = await dialogs.create(userId, partnerId);
      console.log(data);
      dispatch(setCurrentDialog(data))
      clearSearchBar()
    } catch (error: any) {
      if (error.response.data.message === "Такой диалог уже существует") {
        alert('Вы уже ведёте диалог с данным пользователем')
      }
    }
  };

  return (
    <div className={styles.searchResult}>
      {items.length > 0 && (
        <ul>
          {items.map((item: IUser) => (
            <li onClick={() => createDialog(item._id)} className={styles.foundUser}>
              <div className={styles.foundUserAvatar}>
                {item.login.charAt(0).toUpperCase()}
              </div>
              <h3>{item.login}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
