import axios from "axios";
import { IUser } from "../types/user";

export interface ILoginPostData {
  login: string;
  password: string;
}

export interface IRegisterPostData {
  login: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: number;
  token: string;
}

export interface IRequestError {
  message: string;
  statusCode: number;
}

export default {
  getMe: () => axios.get<IUser>("http://localhost:3000/user/profile"),
  verify: (hash: string) => axios.post(`http://localhost:3000/user/verify?hash=${hash}`),
  login: (postData: ILoginPostData) => axios.post<ILoginResponse>("http://localhost:3000/user/login", postData),
  register: (postData: IRegisterPostData) => axios.post<IUser | IRequestError>("http://localhost:3000/user/register", postData),
};
