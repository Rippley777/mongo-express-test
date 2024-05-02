const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

router.post("/", async (req, res) => {
  const { title, content, author, date, featured, imageIds } = req.body;
  console.log("Request to create blog received2", req.body);
  const newBlogPost = new BlogPost({
    title,
    content,
    author,
    date,
    featured,
    images: imageIds,
  });
  await newBlogPost.save();
  console.log({ newBlogPost });
  res.json(newBlogPost);
});

// Get all blog posts with images
router.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find().populate("images");
  res.json(blogPosts);
});

module.exports = router;
