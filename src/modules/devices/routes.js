const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");

const {
  addDevice,
  searchDevices,
  getSimpleDeviceData,
  getDeviceAnalytics,
  getDevices,
} = require("./controllers/devicesController");

const {
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
router.patch("/:deviceId/images", patchDeviceImages);
router.patch("/:id", updateDevice);

router.get("/", getDevices);

module.exports = router;
