import { CallbackError, Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import IUser from "../types/User";
import toHash from "../helpers/toHash";

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

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  try {
    const hashedPassword = await toHash(user.password);
    const confirmHash = await toHash(+new Date() + "");

    if (!hashedPassword || !confirmHash) {
      throw new Error("Не удалось сохранить нового пользователя в базу данных");
    }
    user.password = hashedPassword;
    user.confirm_hash = confirmHash;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export default model<IUser>("User", UserSchema);
