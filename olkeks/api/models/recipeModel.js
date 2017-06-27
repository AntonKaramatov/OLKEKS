'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    name: {
        type: String,
        Required: 'Recipe name is required'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    text: { 
        type: String,
        Required: 'Recipe text is required'
    }
});

module.exports = mongoose.model('Recipes', RecipeSchema);