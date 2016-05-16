var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost/todoapp', function(err, database) {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(port, function() {
    console.log('Server started. Press Ctrl-C to stop the server');
  });
});

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/form', function(req, res) {
  res.render('form');
});

app.get('/', function(req, res) {
  db.collection('info').find().toArray(function(err, results) {
    res.render('index', {data: results});
    console.log(results);
  })
});

app.delete('/delete/:name', function(req, res) {
  var name = req.params.name;
  console.log(name);
  db.collection('info').findOneAndDelete({name: name}, function(err, result) {
    if (err) {
      return res.send(500, err)
    }
    res.redirect('/');
  })
});

app.post('/form-submit', function(req, res) {
  // Insert into mongodb
  db.collection('info').save({name: req.body.name, email: req.body.email, age: req.body.age}, function(err, result) {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/')
  });
});


