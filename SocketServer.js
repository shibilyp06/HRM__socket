const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const messageRouter = require("./router/messageRouter");
require("dotenv").config();
const mongoose = require("./config/mongooseConfig");
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/message", messageRouter);
const connectedUsers = [];

io.on("connection", (socket) => {
  socket.on("studentConnection", ({ studentEmail }) => {
    connectedUsers[studentEmail] = socket.id;
    console.log(`${studentEmail} connected, Staff ID: ${socket.id}`);
  });
  socket.on("staffConnection", ({ staffEmail }) => {
    connectedUsers[staffEmail] = socket.id;
    console.log(`${staffEmail} connected, Staff ID: ${socket.id}`);
  });
  socket.on("adminConnection", ({ adminEmail }) => {
    connectedUsers[adminEmail] = socket.id;
    console.log(`${adminEmail}  connected, Admin ID: ${socket.id}`);
  });
  socket.on("message", ({ message, sender, receiver }) => {
    console.log(`${message} from ${sender} to ${receiver} `);
    const receiverId = connectedUsers[receiver];
    if (receiverId) {
      io.to(receiverId).emit("message", { message, sender, receiver });
      console.log(`Message sent to ${receiver}`);
    } else {
      console.log(`Recipient ${receiver} not found`);
    }
  });
});
server.listen(port, () => {
  console.log(" Socket connected");
});
