var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, response, next) {
  console.log("WELCOME TO THE JUNGLE");

  response.render("index", { title: "Express" });
});

router.post("/", function (req, response, next) {
  response.render("index", { title: req.body.surname });
});

module.exports = router;
