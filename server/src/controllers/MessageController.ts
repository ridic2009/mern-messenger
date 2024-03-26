import express from "express";

import MessageModel from "../models/MessageModel";
import sendResponse from "../helpers/sendResponse";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";
import { Server } from "socket.io";
import DialogModel from "../models/DialogModel";

class MessageController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
    this.create = this.create.bind(this)
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const foundMessage = await MessageModel.find({
        dialog: req.query.dialog_id,
      })
        .populate(["dialog", "sender"])
        .populate({
          path: "dialog",
          populate: {
            path: "initiator",
          },
        })
        .populate({
          path: "dialog",
          populate: {
            path: "partner",
          },
        })
        .exec();

      if (!foundMessage)
        sendResponse(res, statusCodes.NotFound, {
          message: "Сообщение не найдено",
          statusCode: statusCodes.NotFound,
        });

      res.status(statusCodes.OK).json(foundMessage);
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async getAll(_: express.Request, res: express.Response) {
    try {
      const messages = await MessageModel.find();
      res.status(statusCodes.OK).json(messages);
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async create(req: express.Request, res: express.Response) {
    const postData = {
      text: req.body.text,
      sender: req.user._id,
      dialog: req.body.dialog_id,
    };

    const message = new MessageModel(postData);

    try {
      let newMessage = await message.save()
      newMessage = await newMessage.populate(['dialog', 'sender']);

      console.log(
        `Отправлено сообщение: ${message.text}. Диалог: ${message.dialog}`
      );

      await DialogModel.findOneAndUpdate(
        { _id: postData.dialog },
        { lastMessage: message._id },
        { upsert: true }
      );


      this.io.emit("server:message_create", newMessage);

      res.status(statusCodes.OK).json(newMessage);
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
      const deletedMessage = await MessageModel.findByIdAndDelete(
        req.params.id
      );

      if (!deletedMessage)
        sendResponse(res, statusCodes.NotFound, {
          message: `Сообщение с ID: ${req.params.id} не найдено`,
          statusCode: statusCodes.NotFound,
        });

      sendResponse(res, statusCodes.OK, {
        message: `Сообщение с ID: ${req.params.id} удалено`,
        statusCodes: statusCodes.OK,
      });
    } catch (error) {
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  //   async update(req: express.Request, res: express.Response) {
  //     const updateData = {
  //       email: req.body.email,
  //       firstname: req.body.firstname,
  //       lastname: req.body.lastname,
  //       avatar: req.body.avatar,
  //       password: req.body.password,
  //     };

  //     try {
  //       const updatedUser = await UserModel.findByIdAndUpdate(
  //         req.params.id,
  //         updateData,
  //         { new: true }
  //       );

  //       if (!updatedUser)
  //         return res
  //           .status(404)
  //           .send({ message: `Пользователь с ID: ${req.params.id} не найден` });

  //       res.status(200).json(updatedUser);
  //     } catch (error) {
  //       res.status(500).send({ message: "Ошибка сервера" });
  //     }
  //   }
}

export default MessageController;
