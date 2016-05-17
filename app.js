var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var db = require('./db');
db.connect('mongodb://localhost:27017/appdb', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  }
  app.listen(port, function() {
    console.log('Listening on port 3000...')
  })
});

app.use(require('./controllers'));

