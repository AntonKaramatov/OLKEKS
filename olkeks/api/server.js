var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./models/recipeModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Recipedb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/recipeRoutes');
routes(app);

app.use(function (req, res, next) {
  res.status(404).send({message: 'Path not found!'});
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({message: 'Something broke!'});
});

app.listen(port);


console.log('Recipe RESTful API server started on: ' + port);