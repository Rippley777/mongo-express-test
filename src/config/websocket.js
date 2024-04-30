const WebSocket = require("ws");
const generateUniqueId = require("../utils/generateUniqueId");
const connectedUsers = new Map();

const websocketConfig = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function connection(ws) {
    const userId = generateUniqueId();
    let username = `Anon_${userId}`;
    connectedUsers.set(userId, username);

    ws.send(JSON.stringify({ type: "connected" }));

    ws.on("message", function incoming(message) {
      try {
        console.log("received: %s", message);
        const data = JSON.parse(message);
        if (data.type === "set-username") {
          console.log("Setting username to", data.username);
          username = data.username; // Update username
          connectedUsers.set(userId, username);
          console.log("Updated users map:", connectedUsers);
          broadcastUserList();
        } else {
          broadcast(
            JSON.stringify({
              type: "chat-message",
              serverTimestamp: new Date().toISOString(),
              userChatId: userId,
              messageId: generateUniqueId(),
              username: data.username,
              message: data.content,
            })
          );
        }
      } catch (error) {
        console.error("Failed to parse message:", message, "Error:", error);
        // Optionally, send an error message back to the client
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Invalid message format",
          })
        );
      }
      // You can also send messages back to the client
      // ws.send('Message received!');
    });

    console.log({ connectedUsers });
    broadcast(
      JSON.stringify({
        type: "user-connected",
        userId,
        serverTimestamp: new Date().toISOString(),
      })
    );
    connectedUsers.set(userId, username);
    broadcastUserList();

    ws.on("close", function close() {
      connectedUsers.delete(userId);
      broadcast(
        JSON.stringify({
          type: "user-disconnected",
          userId,
          username,
          serverTimestamp: new Date().toISOString(),
        })
      );
      broadcastUserList();
    });
  });

  function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
  function broadcastUserList() {
    const userList = Array.from(connectedUsers);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "user-list", users: userList }));
      }
    });
  }
};

module.exports = websocketConfig;
