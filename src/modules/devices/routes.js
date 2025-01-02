const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authMiddleware");

const {
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
const {
  searchDevices,
  getSearchFilters,
} = require("./controllers/searchController");

router.post("/add", addDevice);

router.get("/search/filters", getSearchFilters);
router.get("/search", searchDevices);

router.get("/simple", getSimpleDeviceData);
router.get("/analytics", getDeviceAnalytics);

router.get("/id/:id", getDeviceById);
router.get("/model/:id", getDeviceByModelIdentifier);
router.patch("/id/:id", updateDevice);
router.patch("/:deviceId/images", patchDeviceImages);

router.get("/", getDevices);

module.exports = router;
