require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define schema and model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// API endpoints
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id });
  res.json(result);
});
// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected2');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
  .catch(err => console.log(err));
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

