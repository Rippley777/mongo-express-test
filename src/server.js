require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

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
  if (Todo) {
    const todos = await Todo.find();
    res.json(todos || []);
  } else {
    res.json([]);
  }
});

app.post('/api/todos', async (req, res) => {
  if (Todo) {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  if (Todo) {
    const result = await Todo.deleteOne({ _id: req.params.id });
    res.json(result);
  }
});
// MongoDB connection
if (process.env.DB_URI) {

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
    .catch(err => console.log(err));
} else {
  console.log('MongoDB not connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

