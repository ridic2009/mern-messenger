import express from "express";
import UserModel from "../schemas/UserModel";

export default async function updateLastSeen(
  _: express.Request,
  __: express.Response,
  next: express.NextFunction
) {

  try {

    await UserModel.updateOne(
      {
        _id: "6589a892913e169c98bb10b2",
      },
      { last_seen: new Date() }
    );
    
  } catch (err) {
    console.log(err);
  }

  next();
}
