const Device = require("../models/Device");

const addDevice = async (req, res) => {
  try {
    const existingDevice = await Device.findOne({
      model_number: req.body.model_number,
    });
    if (existingDevice) {
      return res.status(400).json({
        error: `A device with model_number '${req.body.model_number}' already exists.`,
      });
    }
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const updateDevice = async (req, res) => {
  try {
    const { id } = req.params; // Device ID from the URL
    const updates = req.body; // Updates from the request body

    // Update the device
    const updatedDevice = await Device.findOneAndUpdate(
      { model_identifier: id }, // Find by model_identifier
      updates, // Apply updates
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addDevice,
  searchDevices,
  getDevices,
  getSimpleDeviceData,
  getDeviceAnalytics,
};
