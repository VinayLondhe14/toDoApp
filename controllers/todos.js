var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/todos/new', function(req, res) {
  res.render('todo');
});

router.post('/todos', function(req, res) {
  req.assert('todo', "Todo field cant be empty").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('todo', { errors: errors });
    return;
  }

  Todo.create(req.body.todo, function() {
    res.redirect('/');
  })
});

module.exports = router;
