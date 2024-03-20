export interface IUser {
    _id: string,
    email: string;
    avatar?: string;
    login: string;
    password: string;
    confirmed_hash: string;
    confirmed: boolean;
    last_seen?: Date;
    created_at?: Date;
    updated_at?: Date;
}