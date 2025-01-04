const mongoose = require("mongoose");
const analyticsSchema = require("../models/Analytics");

const modelCache = {}; // Cache models to prevent redefining them

function getAnalyticsModel(siteId) {
  const modelName = `Analytics_${siteId}`;
  console.log("Creating model for:", modelName); // Debug log

  if (!modelCache[modelName]) {
    console.log("Using schema:", analyticsSchema); // Debug log

    modelCache[modelName] = mongoose.model(
      modelName,
      analyticsSchema,
      `analytics_${siteId}`
    );
  }

  return modelCache[modelName];
}

module.exports = getAnalyticsModel;
