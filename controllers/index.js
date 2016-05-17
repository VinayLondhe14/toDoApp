var express = require('express');
var router = express.Router();
var db = require('../db');

router.use(require('./todo'));

router.get('/', function(req, res) {
  db.get().collection('todo').find().toArray(function(err, results) {
    res.render('index', {data: results});
    console.log(results);
  })
});


module.exports = router;
