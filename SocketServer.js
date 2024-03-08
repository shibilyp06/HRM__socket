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
const connectedUsers = [];

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("staffConnection", ({ staffEmail }) => {
    console.log(staffEmail, " : from staff email id");
  });
  socket.on("adminConnection", ({ adminEmail }) => {
    console.log(adminEmail, " : from Admin email id");
  });
  const socketId = socket.id;
  console.log(socketId, " socketId");
  socket.on("message", ({ message, socketId }) => {
    console.log(message, "message from  staff");
    console.log(`message is : ${message} & id is :- ${socketId}`);
  });
});
server.listen(port, () => {
  console.log(" Socket connected");
});
