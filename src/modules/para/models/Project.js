const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tags: [String],
  status: { type: String, default: "active" },
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  resourceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ParaProject", projectSchema);
