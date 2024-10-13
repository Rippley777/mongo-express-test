require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const socketIo = require("socket.io");
const websocketSetup = require("./config/rtcsocket");
const swaggerDocument = YAML.load("src/spec/open-api.yaml");

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");
const productRoutes = require("./routes/productRoutes");
const apptRoutes = require("./modules/appointment/routes");

const websocketConfig = require("./config/websocket");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/blogposts", blogPostRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointments", appointmentRoutes);

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
    const io = socketIo(server);
    websocketSetup(io);
    websocketConfig(server);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Welcome to the MERN Docker Example!"));
app.get("/health", (req, res) =>
  res.status(200).send(process.env.DB_URI ? "UP" : "DOWN")
);
