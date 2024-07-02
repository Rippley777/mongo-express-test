const express = require("express");
const { validateToken } = require("../../middlewares/authMiddleware.js");

const router = express.Router();

router.use(validateToken);

router.get("/", (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
