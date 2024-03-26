import express from "express";
import socket from "socket.io";

import DialogModel from "../models/DialogModel";
import MessageModel from "../models/MessageModel";

import sendResponse from "../helpers/sendResponse";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";

class DialogController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
    this.create = this.create.bind(this);
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const foundDialog = await DialogModel.findById(req.params.id)
        .populate(["initiator", "partner", "lastMessage"])
        .populate({
          path: "lastMessage",
          populate: {
            path: "sender",
          },
        })
        .exec();

      if (!foundDialog)
        sendResponse(res, statusCodes.NotFound, {
          message: `Диалог с id: ${req.params.id} не найден`,
          statusCode: statusCodes.NotFound,
        });

      res.status(statusCodes.OK).json(foundDialog);
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const dialogs = await DialogModel.find()
        .or([{ initiator: req.user._id }, { partner: req.user._id }])
        .populate(["initiator", "partner", "lastMessage"])
        .populate({
          path: "lastMessage",
          populate: {
            path: "sender",
          },
        })
        .exec();

      if (dialogs) {
        res.status(statusCodes.OK).json(dialogs);
      } else {
        res
          .status(statusCodes.NotFound)
          .json({ message: "Диалоги не найдены. WTF" });
      }
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
      initiator: req.body.initiator,
      partner: req.body.partner,
      firstMessage: req.body.text,
    };

    try {
      const foundDialog = await DialogModel.findOne({
        initiator: postData.initiator,
        partner: postData.partner,
      });

      if (foundDialog) {
        sendResponse(res, statusCodes.BadRequest, {
          message: "Такой диалог уже существует",
          statusCode: statusCodes.BadRequest,
        });
      } else {
        const dialog = new DialogModel({
          initiator: postData.initiator,
          partner: postData.partner,
        });
        const newDialog = await dialog.save();

        console.log("Новый диалог ёпты" + " " + newDialog);

        const message = new MessageModel({
          text: postData.firstMessage,
          sender: postData.initiator,
          dialog: newDialog._id,
        });

        const newMessage = await message.save();

        await DialogModel.findOneAndUpdate(
          { _id: newDialog._id },
          { lastMessage: newMessage._id },
          { new: true }
        );

        this.io.emit("server:dialog_create", (data: any) => {
          console.log(data);
        });
        res.status(statusCodes.OK).json(newDialog);
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
      const deletedDialog = await DialogModel.findByIdAndDelete(req.params.id);

      deletedDialog;
      if (!deletedDialog)
        return res
          .status(statusCodes.NotFound)
          .send({ message: `Диалог с ID: ${req.params.id} не найден` });

      res
        .status(statusCodes.OK)
        .send({ message: `Диалог с ID: ${req.params.id} удалён` });
    } catch (error) {
      console.log(error);
      sendResponse(res, statusCodes.InternalServerError, {
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
    }
  }
}

export default DialogController;
