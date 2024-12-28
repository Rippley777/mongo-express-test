const Device = require("../models/Device");

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
  updateDevice,
};
