require("dotenv").config();
const WebSocket = require("ws");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Define schema and model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// API endpoints
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Docker Example!");
});

app.get("/health", (req, res) => {
  // Perform necessary health checks, e.g., database connectivity
  res.status(200).send(process.env.DB_URI ? "UP" : "DOWN");
});

app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos || []);
});

app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id });
  res.json(result);
});

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 11); // Simple unique ID generator
}
const connectedUsers = new Map();
// MongoDB connection
if (process.env.DB_URI) {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
      const server = app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
      );
      // console.log({ server });
      const wss = new WebSocket.Server({ server });

      wss.on("connection", function connection(ws) {
        const userId = generateUniqueId(); // Function to generate a unique ID for each user
        let username = `User${userId}`;

        ws.on("message", function incoming(message) {
          console.log("received: %s", message);
          const data = JSON.parse(message);
          if (data.type === "set-username") {
            username = data.username; // Update username
            connectedUsers.set(userId, username);
            broadcastUserList();
          } else {
            broadcast(
              JSON.stringify({
                type: "chat-message",
                message: `${username}: ${message}`,
              })
            );
          }
          // You can also send messages back to the client
          // ws.send('Message received!');
        });

        connectedUsers.set(userId, username);
        broadcastUserList();

        ws.on("close", function close() {
          broadcast(JSON.stringify({ type: "user-disconnected", userId }));
          connectedUsers.delete(userId);
          broadcastUserList();
        });

        ws.send(JSON.stringify({ type: "connected" }));
      });

      // Optional: Broadcast a message to all connected clients
      function broadcast(data) {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      }

      // Websocket - Chat
      function broadcastUserList() {
        const userList = Array.from(connectedUsers);
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "user-list", users: userList }));
          }
        });
      }
    })
    .catch((err) => console.log(err));
} else {
  console.log("MongoDB not connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
