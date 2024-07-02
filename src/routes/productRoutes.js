const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");
const { validateToken } = require("../middlewares/authMiddleware.js");

router.post("/", validateToken, createProduct);

// Get all product posts with images
router.get("/", getProducts);

module.exports = router;
