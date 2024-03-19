
import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import IUser from "../types/User";

const options = {
  timestamps: true,
};


const UserSchema = new Schema<IUser>(
  {
    avatar: String,
    email: {
      type: String,
      validate: [isEmail, "Введите корректную почту"],
      required: [true, "Почта обязательна для заполнения"],
      unique: true,
    },
    login: {
      type: String,
      required: [true, "Логин обязателен для заполнения"],
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен для заполнения"],
    },
    confirmed_hash: String,
    confirmed: { type: Boolean, default: false },
    last_seen: { type: Date, default: new Date() },
    created_at: Date,
    updated_at: Date,
  },
  options
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
