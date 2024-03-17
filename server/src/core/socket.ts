import { Server } from "socket.io";

export default (httpServer: any) => {
  const options = {
    cors: {
      methods: ["GET", "POST"],
      origin: "*",
      allowedHeaders: ["*"],
      credentials: true,
    },
  };

  const io = new Server(httpServer, options);

  io.on("connection", (socket: any) => {
    console.log("Пользователь подключился");

    socket.on("disconnect", () => {
      console.log("Пользователь отключился");
    });
  });
  return io;
};
