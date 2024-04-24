import express from "express";
import nodemailer from "nodemailer";

import UserModel from "../models/UserModel";
import sendResponse from "../helpers/sendResponse";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";
import { ILoginData } from "../types/Login";
import { createToken } from "../helpers/createToken";
import toHash from "../helpers/toHash";
import bcrypt from "bcrypt";
import { Server } from "socket.io";
import DialogController from "./DialogController";
import DialogModel from "../models/DialogModel";

class UserController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const foundUser = await UserModel.findById(req.params.id).exec();

      if (!foundUser) {
        sendResponse(res, statusCodes.NotFound, {
          message: `Пользователь c ID: ${req.params.id} не найден`,
          statusCode: statusCodes.NotFound,
        });
      } else {
        res.status(statusCodes.OK).json(foundUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const { login } = req.query;

      if (typeof login === "string") {
        const users = await UserModel.find({ login: new RegExp(login, "i") });
        res.status(statusCodes.OK).json(users);
      }

    } catch (error) {
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async getMe(req: express.Request, res: express.Response) {
    try {
      const foundUser = await UserModel.findById(req.user._id).select('-password -confirm_hash').exec();

      if (!foundUser) {
        sendResponse(res, statusCodes.NotFound, {
          message: `Пользователь c ID: ${req.user._id} не найден`,
          statusCode: statusCodes.NotFound,
        });
      } else {
        res.status(statusCodes.OK).json(foundUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verify(req: express.Request, res: express.Response) {
    const hash = req.query.hash;

    if (!hash) {
      sendResponse(res, 422, {
        message: "Неверный хэш",
        statusCode: 422,
      });
    } else {
      const user = await UserModel.findOne({ confirm_hash: hash });

      if (user) {
        if (user.confirmed) {
          sendResponse(res, statusCodes.OK, {
            message: "Данный аккаунт уже был подтверждён ранее",
            statusCode: statusCodes.OK,
          });
        } else {
          user.confirmed = true;
          await user.save();

          sendResponse(res, statusCodes.OK, {
            message: "Аккаунт успешно подтверждён",
            statusCode: statusCodes.OK,
          });
        }
      } else {
        sendResponse(res, statusCodes.NotFound, {
          message: "Хэш не найден",
          statusCode: statusCodes.NotFound,
        });
      }
    }
  }

  async create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      login: req.body.login,
      password: await toHash(req.body.password),
      confirm_hash: await toHash(+new Date() + ""),
    };

    const user = new UserModel(postData);

    try {
      const userIsExist = await UserModel.findOne({ email: postData.email });

      if (userIsExist) {
        sendResponse(res, statusCodes.BadRequest, {
          message: "Пользователь с таким email уже существует",
          statusCode: statusCodes.BadRequest,
        });
      } else {
        let transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: "w1ld-rabbit@ya.ru",
            pass: "tbhhlcwmmrfkcdst",
          },
        });

        transporter.sendMail(
          {
            from: "w1ld-rabbit@ya.ru",
            to: postData.email,
            subject: "Подтверждение аккаунта",
            html: `<b>Доброго времени суток, для подтверждения вашего аккаунта перейдите по <a href="http://localhost:5173/register/verify?hash=${postData.confirm_hash}">ссылке</a></b>`,
          },
          (error, info) => {
            error
              ? console.log(error)
              : console.log(info.messageId, info.response);
          }
        );

        const newUser = await user.save();
        res.status(statusCodes.OK).json(newUser);
      }
    } catch (error) {
      console.log(error);

      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

      deletedUser;
      if (!deletedUser)
        sendResponse(res, statusCodes.NotFound, {
          message: statusCodesMessages[404],
          statusCode: statusCodes.NotFound,
        });

      sendResponse(res, statusCodes.OK, {
        message: `Пользователь с ID: ${req.params.id} удалён`,
        statusCode: statusCodes.OK,
      });
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async update(req: express.Request, res: express.Response) {
    const updateData = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar: req.body.avatar,
      password: req.body.password,
    };

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedUser)
        sendResponse(res, statusCodes.NotFound, {
          message: `Пользователь с ID: ${req.params.id} не найден`,
          statusCode: statusCodes.NotFound,
        });

      res.status(statusCodes.OK).json(updatedUser);
    } catch (error) {
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async login(req: express.Request, res: express.Response) {
    // res.header("Access-Control-Allow-Origin", "*");

    const postData: ILoginData = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const user = await UserModel.findOne({ email: postData.email });

      if (!user) {
        sendResponse(res, statusCodes.NotFound, {
          message: "Пользователь не найден! Идите нахуй!",
          stautsCode: statusCodes.NotFound,
        });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(
          postData.password,
          user.password
        );

        if (isPasswordCorrect) {
          const token = createToken(user);
          sendResponse(res, statusCodes.OK, {
            statusCode: statusCodes.OK,
            token: token,
          });
        } else {
          sendResponse(res, statusCodes.Unauthorized, {
            message: "Неверные данные от аккаунта",
            statusCode: statusCodes.Unauthorized,
          });
        }
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }
}

export default UserController;
