require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const websocketConfig = require("./config/websocket");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

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
    websocketConfig(server);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Welcome to the MERN Docker Example!"));
app.get("/health", (req, res) =>
  res.status(200).send(process.env.DB_URI ? "UP" : "DOWN")
);
