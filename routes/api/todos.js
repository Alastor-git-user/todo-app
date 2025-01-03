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
  await Todo.create({ taskName: req.body.taskName });

  res.json({
    status: "200",
    data: "creation complete",
  });
});

module.exports = router;
