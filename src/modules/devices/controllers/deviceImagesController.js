const Device = require("../models/Device");
const Image = require("../models/Image");

const patchDeviceImages = async (req, res) => {
  try {
    const { deviceId } = req.params; // Device ID from the request params
    const { images } = req.body; // Array of image details

    // Validate images array
    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ error: "Images array is required and should not be empty." });
    }

    // Create new Image documents
    const newImages = await Image.insertMany(
      images.map((image) => ({
        ...image,
        device_id: deviceId, // Link each image to the device
      }))
    );

    // Get the IDs of the newly created images
    const imageIds = newImages.map((img) => img._id);

    // Update the Device document
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      { $addToSet: { images: { $each: imageIds } } }, // Add new image references
      { new: true }
    ).populate("images"); // Optionally populate the images

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found." });
    }

    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  patchDeviceImages,
};
