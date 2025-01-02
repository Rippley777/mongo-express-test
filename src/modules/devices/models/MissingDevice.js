const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    model: { type: String },
    processor: { type: String },
    speed: { type: String },
    generation: { type: String },
    display: { type: String },
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
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
