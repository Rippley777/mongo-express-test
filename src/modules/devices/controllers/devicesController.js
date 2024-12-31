const Device = require("../models/Device");

const searchDevices = async (req, res) => {
  try {
    const filters = {};

    // Apply filters from query parameters
    if (req.query.type) filters.type = req.query.type;
    if (req.query.model)
      filters.model = { $regex: req.query.model, $options: "i" };
    if (req.query.release_year)
      filters.release_year = Number(req.query.release_year);
    if (req.query.model_identifier)
      filters.model_identifier = req.query.model_identifier;
    if (req.query.repairability_score)
      filters.repairability_score = {
        $gte: Number(req.query.repairability_score),
      };

    const devices = await Device.find(filters);
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().select(
      "model release_year model_identifier model_number repairability_score"
    );
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSimpleDeviceData = async (req, res) => {
  try {
    const devices = await Device.find().select(
      "model_identifier release_year repairability_score"
    );
    //   .populate({
    //     path: "images",
    //     match: { type: "device_image" },
    //     select: "url description",
    //   });

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceAnalytics = async (req, res) => {
  try {
    const analytics = await Device.aggregate([
      {
        $group: {
          _id: "$type",
          averageRepairability: { $avg: "$repairability_score" },
        },
      },
    ]);
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  searchDevices,
  getDevices,
  getSimpleDeviceData,
  getDeviceAnalytics,
};
