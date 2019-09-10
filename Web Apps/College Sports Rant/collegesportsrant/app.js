var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

// Create global app object
var app = express();

// CORS REST API support - enables public URL access to your REST API's
app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'sportsrant', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

var mongodb_uri = 'mongodb://sportsrant:boomerBlog@ds123534.mlab.com:23534/sportsrant';

mongoose.connect(mongodb_uri, {
  useMongoClient: false
}, function(err){
  if(err){
    console.log("Error: Could not connect to MongoDB");
    console.log(err);
  } else {
    console.log("Success: Connected to MongoDB!");
  }
});

require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
