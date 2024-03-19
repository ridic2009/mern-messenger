export interface IUser {
    _id: string | null,
    email: string | null;
    avatar?: string | null;
    login: string | null;
    password: string | null;
    confirmed_hash: string | null;
    confirmed: boolean | null;
    last_seen?: Date | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}