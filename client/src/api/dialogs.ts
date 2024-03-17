import axios from "axios"
import { IDialog } from "../components/Dialog/types"

export default {
    getAll: () => axios.get<IDialog[]>('http://localhost:3000/dialogs')
}