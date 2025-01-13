// API (Application Programming Interface)
// application <- (program) <- interface <- user
// bank <- atm <- user
// application <- API (URL -> http verbs) <- user

var express = require("express");
var router = express.Router();

const Todo = require("../../models/todo");

// localhost:3000/api/todos (GET)
router.get("/", async function (req, res, next) {
  const todos = await Todo.findAll();

  res.json({
    status: "200",
    data: todos,
  });
});

router.post("/", async function (req, res, next) {
  const newTodo = await Todo.create({ taskName: `<<${req.body.taskName}>>` });

  res.json({ status: "201", data: newTodo });
});

router.delete("/:todoId", async function (req, res, next) {
  await Todo.destroy({ where: { id: req.params.todoId } });

  res.json({ status: "202", data: "todo has been delete" });
});

router.patch("/:todoId", async function (req, res, next) {
  const todoId = req.params.todoId;

  await Todo.update(
    { completedAt: req.body.complete === "true" ? new Date() : null },
    { where: { id: todoId } },
  );
  const todo = await Todo.findByPk(todoId);

  res.json({ status: "203", data: todo });
});

module.exports = router;
