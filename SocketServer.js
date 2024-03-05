const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
require("dotenv").config();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: process.env.REACT_ORIGIN,
  })
);
const connectedUsers = new Map();

io.on("connection", (socket) => { 
  console.log("A user is connected")  ;
  const socketId = socket.id;
  console.log(socketId, " socketId");
  socket.on("message", ({ message, resiverId }) => {
    console.log(connectedUsers, "connected users");
    const resiverSocket = connectedUsers.get(resiverId);
       console.log(resiverSocket , "resiver socket");
    if (resiverSocket) {
      console.log(`message is : ${message} & id is :- ${resiverId}`);
      resiverSocket.emit("message", message);
    } else {
      console.log("resiver is not connected");
    }
  });

  connectedUsers.set(socketId, socket);
});
server.listen(port, () => {
  console.log(" Socket connected");
});
