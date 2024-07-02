const express = require("express");
const { register } = require("../../controllers/registerControllers");

const router = express.Router();

router.post("/", register);

module.exports = router;
