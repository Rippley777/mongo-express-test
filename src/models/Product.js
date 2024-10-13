const mongoose = require("mongoose");

// example price object
// price: {
//   1: 10,
//   7: 40,
//   30: 100,
//   365: 300,
// }
const productSchema = new mongoose.Schema({
  content: String,
  manufacturer: String,
  model: String,
  description: String,
  price: Object,
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
