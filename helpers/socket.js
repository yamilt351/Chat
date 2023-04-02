import { Server } from "socket.io";

export function setUpSocket(server) {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("user conected");
  });
  return io;
}

