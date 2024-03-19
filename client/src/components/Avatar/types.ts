import { IUser } from "../../types/user"

export interface IAvatarProps {
    isOnline?: boolean
    avatar: string | undefined,
    user: IUser
}