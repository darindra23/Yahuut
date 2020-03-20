if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("room", data => {
    socket.broadcast.emit("roomUpdate", data);
  });
  socket.on("join", data => {
    console.log(data,'ini join');
    socket.join(Number(data));
  });
  socket.on("player", data => {
    console.log(data,'ini player');
    socket.to(data[0].RoomId).broadcast.emit("playerUpdate", data);
  });
});

http.listen(PORT, function() {
  console.log("listening on port :", PORT);
});
