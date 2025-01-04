const mongoose = require("mongoose");
const analyticsSchema = require("../models/AnalyticsSchema");

const modelCache = {}; // Cache models to prevent redefining them

function getAnalyticsModel(siteId) {
  const modelName = `Analytics_${siteId}`;

  if (!modelCache[modelName]) {
    modelCache[modelName] = mongoose.model(
      modelName,
      analyticsSchema,
      `analytics_${siteId}`
    );
  }

  return modelCache[modelName];
}

module.exports = getAnalyticsModel;
