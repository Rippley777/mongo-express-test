const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    device_id: { type: mongoose.Schema.Types.ObjectId, ref: "Device" }, // Reference to the device
    type: {
      type: String,
      required: true,
      enum: [
        "device_image", // General device image
        "component_layout", // Internal layout diagram
        "battery_image", // Image of the battery
        "ram_image", // Image of the RAM or RAM slot
        "storage_image", // Image of the storage drive or bay
        "tools_image", // Required tools
        "repair_guide_step", // Step-specific repair guide images
      ],
    },
    url: { type: String, required: true }, // URL or file path of the image
    description: { type: String }, // Optional description for the image
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeviceImage", imageSchema);
