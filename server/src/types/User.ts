import { Document } from "mongodb";

export default interface IUser extends Document {
  email: string;
  avatar?: string;
  login: string;
  password: string;
  confirm_hash: string;
  confirmed: boolean;
  last_seen: Date;
  created_at: Date;
  updated_at: Date;
}
