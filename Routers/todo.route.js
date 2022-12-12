const express = require("express");
const { TodoModel } = require("../Models/Todos.model");
const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  const todo = await TodoModel.find();
  res.send(todo);
});

todoRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_todos = new TodoModel(payload);
    await new_todos.save();
    res.send({ msg: "Todo created successfully" });
  } catch (err) {
    res.send(400).json({ msg: "Something Went Wrong" });
  }
});

todoRouter.patch("/update/:todoID", async (req, res) => {
  const todoID = req.params.todoID;
  const userID = req.body.userID;
  try {
    const todo = await TodoModel.findOne({ _id: todoID });
    if (userID !== todo.userID) {
      res.send("Not authorised");
    } else {
      await TodoModel.findByIdAndUpdate({ _id: todoID }, payload);
      res.send({ msg: "Todo updated successfully" });
    }
  } catch (err) {
    res.send(400).send({ msg: "Something Went Wrong" });
  }
});

todoRouter.delete("/delete/:todoID", async (req, res) => {
  const todoID = req.params.todoID;
  const userID = req.body.userID;
  const todo = await TodoModel.findOne({ _id: todoID });
  if (userID !== todo.userID) {
    res.send("Not authorised");
  } else {
    await TodoModel.findByIdAndDelete({ _id: todoID });
    res.send({ msg: "Note deleted successfully" });
  }
});

module.exports = { todoRouter };
