const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model_identifier: { type: String, required: true, unique: true },
    release_year: { type: Number, required: true },
    model_number: { type: String, required: true },
    repairability_score: { type: Number, required: true },
    hardware_details: {
      memory: { type: String, required: true },
      memory_connector: { type: String, required: true },
      max_ram: { type: String },
      storage: { type: String, required: true },
      storage_connector: { type: String, required: true },
      max_storage: { type: String },
      processor: { type: String, required: true },
      processor_socket: { type: String, required: true },
      gpu_model: { type: String },
      gpu_connector: { type: String },
      screen_size: { type: String },
      resolution: { type: String },
      port_types: { type: [String] },
      wireless: { type: String },
      bluetooth_version: { type: String },
    },
    repairability_insights: {
      battery: { type: String, required: true },
      ram_storage: { type: String, required: true },
      tools_required: { type: String, required: true },
      adhesive_level: { type: String },
      cooling_system: { type: String },
    },
    repair_difficulty: { type: String },
    disassembly_steps: { type: Number },
    disassembly_tool_count: { type: Number },
    known_issues: { type: [String], required: true },
    replacement_part_availability: { type: String },
    estimated_repair_cost: {
      battery: { type: String },
      screen: { type: String },
      keyboard: { type: String },
    },
    repair_guide_availability: { type: String },
    community_score: { type: Number },
    recyclability: { type: String },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceImage" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
