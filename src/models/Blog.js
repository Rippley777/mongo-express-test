const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: Blob,
  author: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  date: Date,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
