import express from "express";
import UserModel from "../models/UserModel";

export default async function updateLastSeen(
  req: express.Request,
  __: express.Response,
  next: express.NextFunction
) {
  try {

    await UserModel.updateOne(
      {
        _id: req.user._id,
      },
      { last_seen: new Date() }
    );
  } catch (err) {
    console.log(err);
  }

  next();
}
