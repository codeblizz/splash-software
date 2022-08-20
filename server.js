const express = require("express");
const config = require("./config");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { PORT } = config;

const app = express();
const httpServer = http.createServer(app);
app.use(cors());


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("player_name", (name) => {
    app.set("io", socket);
    console.log("name from client", name);
    io.emit("server_message", `${name}'s bet initializing`);
  });

  socket.on("Api request", (msg) => {
    console.log("Api request from client", msg);
    let dataSet;
    // for(let x = 0; x <= 10; x++) {
      dataSet = Math.floor(Math.random() * (105 - 0 + 1)) + 0;
    // }
    console.log("dataSet", dataSet);
    io.emit("Api response", `${dataSet}`)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const start = () => {
  httpServer.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
  });
};

start();
