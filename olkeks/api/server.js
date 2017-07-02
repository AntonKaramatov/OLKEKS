var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var Recipe = require('./models/recipeModel');
var User = require('./models/userModel');
var bodyParser = require('body-parser');
var session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Recipedb'); 
mongoose.model('Recipe', Recipe.schema);
mongoose.model('User', User.schema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { }
}));

var publicRoutes = require('./routes/publicRoutes');
publicRoutes(app);

app.use(function (req, res, next) {
  if(!req.session || !req.session.userId) {
    return res.status(401).send({message: `Only authenticated users can access path ${req.originalUrl}`});
  }
  next();
});

var protectedRoutes = require('./routes/protectedRoutes');
protectedRoutes(app);

app.use(function (req, res, next) {
  return res.status(404).send({message: 'Path not found!'});
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  return res.status(500).send({message: 'Something broke!'});
});

app.listen(port);


console.log('Recipe RESTful API server started on: ' + port);