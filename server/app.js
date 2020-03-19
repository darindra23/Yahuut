if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("show-data", data => {
    socket.broadcast.emit("realtime-data", data);
  });
});

http.listen(PORT, function() {
  console.log("listening on port :", PORT);
});
