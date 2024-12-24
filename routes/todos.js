var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, response, next) {

  response.render("todos", { title: "Express" });
});

router.post("/", function (req, response, next) {
  response.render("todos", { title: req.body.task });
});

module.exports = router;