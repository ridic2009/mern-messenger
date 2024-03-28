import axios from "axios";
import { IMessage } from "../types/message";

export default {
    getAllMessagesByDialogId: (dialogId: string) => axios.get<IMessage[]>('http://localhost:3000/messages?dialog_id=' + dialogId),
    send: (text: string, senderId: string, dialogId: string | undefined) => axios.post<IMessage>('http://localhost:3000/messages', {
        text: text,
        sender: senderId,
        dialog_id: dialogId
    })
}