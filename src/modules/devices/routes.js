const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");

const {
  searchDevices,
  getSimpleDeviceData,
  getDeviceAnalytics,
  getDevices,
} = require("./controllers/devicesController");

const {
  addDevice,
  getDeviceById,
  updateDevice,
  getDeviceByModelIdentifier,
} = require("./controllers/deviceController");
const { patchDeviceImages } = require("./controllers/deviceImagesController");

router.post("/add", addDevice);
router.get("/search", searchDevices);
router.get("/simple", getSimpleDeviceData);
router.get("/analytics", getDeviceAnalytics);
router.get("/id/:id", getDeviceById);
router.get("/model/:id", getDeviceByModelIdentifier);
router.patch("/id/:id", updateDevice);
router.patch("/:deviceId/images", patchDeviceImages);

router.get("/", getDevices);

module.exports = router;
