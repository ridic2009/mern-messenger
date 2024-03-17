import axios from "axios";
import { IMessage } from "../components/Message/types";

export default {
    getAllMessagesByDialogId: (dialogId: string) => axios.get<IMessage[]>('http://localhost:3004/messages?dialog_id=' + dialogId)
}