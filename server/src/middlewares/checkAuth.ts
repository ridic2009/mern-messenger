import express from "express";
import verifyToken from "../helpers/verifyToken";
import sendResponse from "../helpers/sendResponse";
import statusCodes from "../configs/statusCodes.json";
import statusCodesMessages from "../configs/statusCodesMessages.json";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export default async function checkAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Если запрос к таким то путям, то скипает данный миддлвар и переходит к следующему
  if (
    req.path === "/user/login" ||
    req.path === "/user/register" ||
    req.path === "/user/verify"
  )
    return next();

  try {
    const token = req.headers.token;
    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
      req.user = verifiedToken;

      next();
    } else {
      sendResponse(res, statusCodes.Forbidden, {
        message: statusCodesMessages[403],
      });
    }
  } catch (error) {
    console.log(error);
  }
}
