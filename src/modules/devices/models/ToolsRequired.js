const mongoose = require("mongoose");

const ToolsRequiredSchema = new mongoose.Schema({
  model_number: { type: String, required: true, unique: true },
  tools: [
    {
      name: { type: String, required: true },
      usage: { type: String, required: true },
    },
  ],
});

const ToolsRequired = mongoose.model("ToolsRequired", ToolsRequiredSchema);

module.exports = ToolsRequired;
