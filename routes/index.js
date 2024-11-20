var express = require('express');
var router = express.Router();

//req = request; res = response; next = ----
var temporal = function(req, response, next) {
  response.render('index', { title: 'Express' });
}

/* GET home page. */
router.get('/', temporal);

module.exports = router;