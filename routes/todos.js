var express = require("express");
var router = express.Router();

const Todo = require("../models/todo");

router.get("/", async function (req, res, next) {
  const todos = await Todo.findAll();

  res.render("todos", {
    title: "Express",
    todos: todos.map((todo) => ({ id: todo.id, name: todo.taskName })),
  });
});

// URL - Uniform Resource Locator
// HTML FORM: GET | POST
// HTTP:
//  | GET    -> public  | "get" data -> html | json
//  | POST   -> private | create
//  | DELETE -> private | delete
//  | PATCH  -> private | update (parcial)
router.post("/", async function (req, res, next) {
  await Todo.create({ taskName: req.body.task });
  const todos = await Todo.findAll();

  res.render("todos", {
    title: "FROM POST",
    todos: todos.map((todo) => ({ id: todo.id, name: todo.taskName })),
  });
});

router.delete("/", async function (req, res, next) {
  await Todo.destroy({ where: { id: req.body.id } });
  const todos = await Todo.findAll();

  res.render("todos", {
    title: "FROM DELETE",
    todos: todos.map((todo) => ({ name: todo.taskName })),
  });
});

module.exports = router;
