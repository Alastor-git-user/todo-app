var express = require("express");
var router = express.Router();

const Todo = require("../models/todo");

const renderTodos = async (res, title) => {
  const todos = await Todo.findAll();

  res.render("todos", {
    title,
    todos: todos.map((todo) => ({
      id: todo.id,
      name: todo.taskName,
      isCompleted: Boolean(todo.completedAt),
    })),
  });
};

router.get("/", async function (req, res, next) {
  renderTodos(res, "FROM GET");
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

  renderTodos(res, "FROM POST");
});

router.delete("/", async function (req, res, next) {
  await Todo.destroy({ where: { id: req.body.id } });

  renderTodos(res, "FROM DELETE");
});

router.patch("/", async function (req, res, next) {
  await Todo.update(
    { completedAt: req.body.complete === "true" ? new Date() : null },
    { where: { id: req.body.id } },
  );

  renderTodos(res, "FROM PATCH");
});

module.exports = router;
