import express from "express";

import "./core/env";
import "./core/db";
import routes from "./core/routes";

import { createServer } from "http";
import createSocket from "./core/socket";

const app = express();
const httpServer = createServer(app);
const io = createSocket(httpServer)

routes(app, io)

httpServer.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
