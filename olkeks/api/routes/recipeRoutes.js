'use strict';
module.exports = function(app) {
  var recipes = require('../controllers/recipeController');

  app.route('/api/recipes')
    .get(recipes.getAll)
    .post(recipes.create);


  app.route('/api/recipes/:recipeId')
    .get(recipes.get)
    .put(recipes.update)
    .delete(recipes.delete);
};