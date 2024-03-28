import { IUser } from "../../../types/user";

export interface IUserState {
    data: IUser;
    status: string | number | null;
    token: string | null;
    isAuth: boolean;
  }