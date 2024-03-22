import axios from "axios";
import { IUser } from "../types/user";

export default {
    getMe: () => axios.get<IUser>('http://localhost:3000/user/profile'),
    verify: (hash: string) => axios.post(`http://localhost:3000/user/verify?hash=${hash}`)
}