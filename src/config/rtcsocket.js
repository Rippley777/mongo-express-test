module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("offer", (offer, room) => {
      socket.to(room).emit("offer", offer);
    });

    socket.on("answer", (answer, room) => {
      socket.to(room).emit("answer", answer);
    });

    socket.on("candidate", (candidate, room) => {
      socket.to(room).emit("candidate", candidate);
    });

    socket.on("join", (room) => {
      socket.join(room);
    });
  });
};
