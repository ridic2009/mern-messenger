import { Express } from "express";
import bodyParser from "body-parser";


import updateLastSeen from "../middlewares/updateLastSeen";
import checkAuth from "../middlewares/checkAuth";

import UserController from "../controllers/UserController";
import DialogController from "../controllers/DialogController";
import MessageController from "../controllers/MessageController";

import cors from 'cors'
import { Server } from "socket.io";

export default (app: Express, io: Server) => {
  app.use(bodyParser.json());
  app.use(cors())
  app.use(checkAuth);
  app.use(updateLastSeen);


  const User = new UserController(io);
  const Dialog = new DialogController(io);
  const Messages = new MessageController(io);

  // Пользователь
  app.get("/user/profile", User.getMe);
  app.get("/user/:id", User.getById);
  app.get("/users", User.getAll);
  app.post("/user/register", User.create);
  app.post("/user/login", User.login);
  app.post("/user/verify", User.verify)
  app.delete("/user/:id", User.delete);
  app.put("/user/update/:id", User.update);

  // Диалог
  app.get("/dialogs", Dialog.getAll);
  app.get("/dialog/:id", Dialog.getById);
  app.post("/dialog/create", Dialog.create);
  app.delete("/dialog/:id", Dialog.delete);

  // Сообщения
  app.get("/messages", Messages.getById);
  app.post("/messages", Messages.create);
  app.delete("/messages/:id", Messages.delete);
};
