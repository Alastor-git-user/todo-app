var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, response, next) {
  response.render("index", { title: "Express" });
});

module.exports = router;
