import express from "express";

import DialogModel from "../schemas/DialogModel";
import MessageModel from "../schemas/MessageModel";

import sendResponse from "../helpers/sendResponse";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";
import { Server } from "socket.io";

class DialogController {
  io: Server;

  constructor(io: Server) {
    this.io = io
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const foundDialog = await DialogModel.findById(req.params.id)
        .populate(["initiator", "partner"])
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
      const dialogs = await DialogModel.find({
        initiator: req.user._id,
      })
        .populate(["initiator", "partner"])
        .exec();

      res.status(statusCodes.OK).json(dialogs);
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
    };

    const dialog = new DialogModel(postData);

    try {
      const newDialog = await dialog.save();

      const message = new MessageModel({
        text: req.body.text,
        sender: req.body.initiator,
        dialog: newDialog._id,
      });

      await message.save();

      console.log(`Dialog created with this data: ${dialog}`);
      res.status(statusCodes.OK).json(newDialog);
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
