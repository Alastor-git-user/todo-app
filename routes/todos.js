var express = require("express");
var router = express.Router();

const Todo = require("../models/todo");

router.get("/", async function (req, response, next) {
  const todos = await Todo.findAll();

  response.render("todos", {
    title: "Express",
    todos: todos.map((todo) => ({ name: todo.taskName })),
  });
});

router.post("/", async function (req, response, next) {
  await Todo.create({ taskName: req.body.task });
  const todos = await Todo.findAll();

  response.render("todos", {
    title: "FROM POST",
    todos: todos.map((todo) => ({ name: todo.taskName })),
  });
});

module.exports = router;
