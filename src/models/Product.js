const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  content: String,
  manufacturer: String,
  model: String,
  description: String,
  price: Number,
  quantity: Number,
  filters: [String],
  title: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], // Array of image IDs
  date: Date,
  featured: Boolean,
  availability: [
    {
      location: String,
      quantity: Number,
      price: Number,
    },
  ],
  tags: [String],
});

module.exports = mongoose.model("Product", productSchema);
