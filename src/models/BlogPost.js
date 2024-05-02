const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  content: String,
  title: String,
  author: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], // Array of image IDs
  date: Date,
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
