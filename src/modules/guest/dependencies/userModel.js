// EJECT REMOVE START //
const User = require("../../../models/User");
// EJECT REMOVE END //

// EJECT UNCOMMENT START //
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String },
//   role: { type: String, default: "user" },
//   dateCreated: { type: Date },
//   lastLogin: { type: Date },
// });

// const User = mongoose.model("User", userSchema);
// EJECT UNCOMMENT END //

module.exports = User;
