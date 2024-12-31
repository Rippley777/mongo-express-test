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

const getDeviceById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDeviceByModelIdentifier = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findOne({ model_identifier: id });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getDeviceById,
  getDeviceByModelIdentifier,
  updateDevice,
};
