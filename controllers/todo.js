var express = require('express');
var router = express.Router();

router.get('/todo', function(req, res) {
  res.render('todo');
});

module.exports = router;
