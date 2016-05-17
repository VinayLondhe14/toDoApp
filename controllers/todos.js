var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/todos/new', function(req, res) {
  res.render('todo');
});

router.post('/todos', function(req, res) {
  Todo.create(req.body.name, function() {
    res.redirect('/');
  })
});

module.exports = router;
