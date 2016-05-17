var express = require('express');
var router = express.Router();
var db = require('../db');
var Todo = require('../models/todo');

router.use(require('./todos'));

router.get('/', function(req, res) {
  Todo.all(function(err, results) {
    res.render('index', {data: results});
  });
});


module.exports = router;
