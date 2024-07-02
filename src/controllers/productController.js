const db = require("../config/db");
const Product = require("../models/Product");

// const logger = require("../lib/helpers/logger");

exports.createProduct = async (req, res) => {
  const {
    title,
    manufacturer,
    model,
    description,
    price,
    quantity,
    filters,
    date,
    featured,
    imageIds,
  } = req.body;
  console.log("Request to create product received2", req.body);
  const newProduct = new Product({
    title,
    manufacturer,
    model,
    description,
    price,
    quantity,
    filters: filters?.split(",") || [],
    date,
    featured,
    images: imageIds,
    availability: [
      {
        location: "Warehouse A",
        quantity: quantity,
        price: price,
      },
    ],
    tags: ["new", "sale"],
  });
  await newProduct.save();
  console.log({ newProduct });
  res.json(newProduct);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("images");
  console.log({ products });
  res.json(products);
};
