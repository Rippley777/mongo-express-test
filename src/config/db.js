const mongoose = require("mongoose");

exports.dbURL = process.env.DB_URI || "mongodb://localhost:27017/auth";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
