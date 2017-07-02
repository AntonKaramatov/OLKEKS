'use strict';
module.exports = function (app) {
  var recipes = require('../controllers/recipeController');
  var users = require('../controllers/userController');

  app.route('/api/recipes')
    .get(recipes.getAll);

  app.route('/api/recipes/:recipeId')
    .get(recipes.get);

  app.route('/api/users/register')
    .post(users.register);

  app.route('/api/users/login')
    .post(users.login);

  app.route('/api/users/logout')
    .get(users.logout);
};