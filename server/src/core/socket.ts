import { Server } from "socket.io";
import http from "http";

export default (http: http.Server) => {
  const options = {
    cors: {
      methods: ["GET", "POST", "DELETE", "PUT"],
      origin: "*",
      allowedHeaders: ["*"],
      credentials: true,
    },
  };

  const io = new Server(http, options);

  io.on("connection", function (socket) {
    console.log("Пользователь подключился");

    socket.on("disconnect", () => {
      console.log("Пользователь отключился");
    });
  });

  return io;
};
