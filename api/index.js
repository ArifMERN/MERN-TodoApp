const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());
// DB configuration
mongoose
  .connect("mongodb://localhost:27017/Todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

// routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    return res.json(error);
  }
});
app.post("/todo/create", async (req, res) => {
  const todo = await new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});
app.delete("/todo/delete/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndDelete(id);
  res.json(todo);
});
app.get("/todo/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    todo.save();
    res.json(todo);
  } catch (error) {
    return res.json(error);
  }
});

// server
app.listen("3001", () => {
  console.log("server is runnning");
});
