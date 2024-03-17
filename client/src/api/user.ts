import axios from "axios";

export default {
    getMe: () => axios.get<any>('http://localhost:3000/user/profile')
}