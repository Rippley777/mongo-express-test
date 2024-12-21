const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  entityType: { type: String, required: true }, // Project, Area, Resource
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  action: { type: String, required: true }, // CREATE, UPDATE, DELETE
  userId: { type: String },
  beforeData: { type: mongoose.Schema.Types.Mixed },
  afterData: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ParaAuditLog", auditLogSchema);
