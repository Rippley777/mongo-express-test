const express = require("express");
const router = express.Router();
const multer = require("multer");

const Image = require("../models/Image");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.body.name,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    const savedItem = await newImage.save();
    res
      .status(201)
      .json({
        message: "Item created successfully",
        id: savedItem._id,
        item: savedItem,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred.");
  }
});

router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({}); // Fetch all images from MongoDB
    res.json(
      images.map((image) => {
        return {
          id: image._id,
          name: image.name,
          contentType: image.img.contentType,
        };
      })
    );
  } catch (error) {
    console.error("Failed to retrieve images", error);
    res.status(500).send("Failed to retrieve images");
  }
});

router.get("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.contentType(image.img.contentType);
    res.send(image.img.data);
  } catch (error) {
    res.status(404).send("Image not found.");
  }
});

module.exports = router;
