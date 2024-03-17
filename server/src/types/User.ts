import { Document } from "mongodb";

export default interface IUser extends Document{
    email: string;
    avatar?: string;
    firstname: string;
    lastname?: string;
    password: string;
    confirmed_hash: string;
    confirmed: boolean;
    last_seen: Date;
    created_at: Date;
    updated_at: Date;
}