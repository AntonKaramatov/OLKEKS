'use strict';


var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipes');

exports.getAll = function (req, res) {
  var searchQuery = {};
  if(req.query.userId) {
    searchQuery.user = req.query.userId;
  }
  if(req.query.search) {
    searchQuery.$or = [{name: { $regex: req.query.search, $options: 'i' }},
      {text: { $regex: req.query.search, $options: 'i' }}];
  }
  Recipe.find(searchQuery, '-text')
    .populate('user', 'username')
    .exec(function (err, recipe) {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      if(recipe === null) {
        recipe = [];
      }
      return res.json(recipe);
    });
};

exports.create = function (req, res) {
  var new_recipe = new Recipe(req.body);
  new_recipe.user = req.session.userId;
  new_recipe.save(function (err, recipe) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(201).json(recipe);
  });
};

exports.get = function (req, res) {
  Recipe.findById(req.params.recipeId)
    .populate('user', 'username')
    .exec(function (err, recipe) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if(recipe === null) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    return res.json(recipe);
  });
};


exports.update = function (req, res) {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId, user: req.session.userId }, req.body, { new: true, runValidators: true }, function (err, recipe) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    return res.json(recipe);
  });
};


exports.delete = function (req, res) {
  Recipe.remove({_id: req.params.recipeId, user: req.session.userId}, function (err, recipe) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    return res.json({ message: 'Recipe successfully deleted' });
  });
};