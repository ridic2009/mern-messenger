import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import IUser from "../types/User";

const UserSchema = new Schema(
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
    confirm_hash: String,
    confirmed: { type: Boolean, default: false },
    last_seen: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
