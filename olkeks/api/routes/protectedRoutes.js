'use strict';
module.exports = function (app) {
    var recipes = require('../controllers/recipeController');
  var users = require('../controllers/userController');

    app.route('/api/recipes')
        .post(recipes.create);    

    app.route('/api/recipes/comment/:recipeId')
        .post(recipes.comment);

    app.route('/api/recipes/:recipeId')
        .put(recipes.update)
        .delete(recipes.delete);
};