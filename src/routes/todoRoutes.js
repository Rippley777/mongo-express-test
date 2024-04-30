const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos || []);
});

router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

router.delete("/:id", async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id });
  res.json(result);
});

module.exports = router;
