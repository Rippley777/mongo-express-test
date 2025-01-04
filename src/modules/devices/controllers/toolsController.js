const ToolsRequired = require("../models/ToolsRequired");

const addRequiredTools = async (req, res) => {
  try {
    const { model_number, tools } = req.body;

    if (!model_number || !tools || !Array.isArray(tools)) {
      return res.status(400).json({
        error:
          "Invalid input. Ensure model_number and tools array are provided.",
      });
    }

    const existingEntry = await ToolsRequired.findOne({ model_number });
    if (existingEntry) {
      return res.status(400).json({
        error: "Tools for this model number already exist. Use update instead.",
      });
    }

    const newToolsRequired = new ToolsRequired({ model_number, tools });
    await newToolsRequired.save();

    res
      .status(201)
      .json({ message: "Tools added successfully!", data: newToolsRequired });
  } catch (error) {
    console.error("Error adding tools:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  addRequiredTools,
};
