import express from "express";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";

interface IResponseMessage {
  [key: string]: string | number | boolean | null | object;
}

export default function sendResponse(
  res: express.Response,
  statusCode: number,
  message: IResponseMessage
): express.Response {
  try {
    return res.status(statusCode).send(message);
  } catch (error) {
    console.error(error);
    return res
      .status(statusCodes.InternalServerError)
      .send({
        message: statusCodesMessages[500],
        statusCode: statusCodes.InternalServerError,
      });
  }
}
