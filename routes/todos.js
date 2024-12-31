var express = require("express");
var router = express.Router();

const Todo = require("../models/todo");

router.get("/", async function (req, res, next) {
  const todos = await Todo.findAll();

  res.render("todos", {
    title: "FROM GET",
    todos: todos.map((todo) => ({
      id: todo.id,
      name: todo.taskName,
      isCompleted: Boolean(todo.completedAt),
    })),
  });
});

// URL - Uniform Resource Locator
// HTML FORM: GET | POST
// HTTP:
//  | GET    -> public  | "get" data -> html | json
//  | POST   -> private | create
//  | DELETE -> private | delete
//  | PATCH  -> private | update (parcial)
//
// locahost:3000/todos   <- get <- traeme todos los "todos"
// locahost:3000/todos   <- post <- agrega 1 todo a la lista
//
// locahost:3000/todos/1 <- get <- traeme todo lo de "todo:1"
// locahost:3000/todos/1 <- post <- -----
// locahost:3000/todos/1 <- delete <- borra el recurso 1
// locahost:3000/todos/1 <- patch <- actualiza el recurso 1
router.post("/", async function (req, res, next) {
  await Todo.create({ taskName: req.body.task });

  res.redirect("/todos");
});

router.delete("/:todoId", async function (req, res, next) {
  await Todo.destroy({ where: { id: req.params.todoId } });

  res.redirect("/todos");
});

router.patch("/:todoId", async function (req, res, next) {
  await Todo.update(
    { completedAt: req.body.complete === "true" ? new Date() : null },
    { where: { id: req.params.todoId } },
  );

  res.redirect("/todos");
});

module.exports = router;
