const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tags: [String],
  projectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  resourceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ParaArea", areaSchema);
