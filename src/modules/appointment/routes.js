const express = require("express");
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./controller");
const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
