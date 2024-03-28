import { IUser } from "../../../types/user";

export interface IUserState {
    data: IUser;
    status: string | null;
    token: string | null;
    isAuth: boolean;
  }