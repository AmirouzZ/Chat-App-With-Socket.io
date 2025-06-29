const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  console.log("new user connected");
  //socket.emit("chat-message", "hello world");
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);

    delete users[socket.id];
  });
});
