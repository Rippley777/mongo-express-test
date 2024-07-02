const express = require("express");

const loginRoutes = require("./login");
const registerRoutes = require("./register");
const validateRoutes = require("./validate");

const router = express.Router();

router.use("/register", registerRoutes);
router.use("/login", loginRoutes);
router.use("/validate", validateRoutes);

module.exports = router;
