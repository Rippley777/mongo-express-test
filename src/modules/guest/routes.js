const express = require("express");
const {
  register,
  retrieve,
  // createAppointment,
  // updateAppointment,
  // deleteAppointment,
} = require("./controller");
const router = express.Router();

router.post("/", register);
router.get("/", retrieve);
// router.put("/:id", updateAppointment);
// router.delete("/:id", deleteAppointment);

module.exports = router;
