const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  role: { type: String, default: "guest" },
  dateCreated: { type: Date },
  lastLogin: { type: Date },
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
