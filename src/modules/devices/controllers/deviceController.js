const Device = require("../models/Device");

const getDeviceById = async (req, res) => {
  const { id } = req.body;
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
  getDeviceById,
  updateDevice,
};
