import axios from "axios"
import { IDialog } from "../types/dialog"

export default {
    getAll: () => axios.get<IDialog[]>('http://localhost:3000/dialogs'),
    create: (initiator: string, partner: string) => axios.post('http://localhost:3000/dialog/create', {
        initiator,
        partner
    })
}