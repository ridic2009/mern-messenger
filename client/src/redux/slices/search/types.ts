import { IUser } from "../../../types/user"

export interface ISearchState {
    items: IUser[]
    value: string
    status: string | null
}