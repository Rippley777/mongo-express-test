const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, default: "general" },
  tags: [String],
  relatedProjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  relatedAreaIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ParaResource", resourceSchema);
