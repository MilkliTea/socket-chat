require("dotenv").config();

const express = require("express");
const socket = require("socket.io");
const app = express();
const port = app.listen(process.env.SOCKET_PORT);

app.use(express.static("public"));

const io = socket(port);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
