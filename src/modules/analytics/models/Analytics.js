const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  siteId: { type: String, required: true }, // Unique identifier for each site
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  event: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  device: {
    type: new mongoose.Schema({
      type: { type: String },
      os: { type: String },
      browser: { type: String },
      screenSize: {
        width: { type: Number },
        height: { type: Number },
      },
      userAgent: { type: String },
    }),
    default: {},
  },
  location: {
    type: new mongoose.Schema({
      country: { type: String },
      region: { type: String },
      city: { type: String },
    }),
    default: {},
  },
  createdAt: { type: Date, default: Date.now },
});

analyticsSchema.index({ siteId: 1, createdAt: -1 }); // Efficient queries by site and time

module.exports = mongoose.model("Analytics", analyticsSchema);
