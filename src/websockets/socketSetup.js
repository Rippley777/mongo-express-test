const socketIo = require("socket.io");

function websocketSetup(server) {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.on("message", (data) => {
      console.log("Message received:", data);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  });

  return io;
}

module.exports = websocketSetup;
