import express from "express";
import { createServer } from "http";

import "./core/env";
import "./core/db";
import routes from "./core/routes";
import createSocket from "./core/socket";

const app = express();
const http = createServer(app);
const io = createSocket(http)

routes(app, io)

http.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
