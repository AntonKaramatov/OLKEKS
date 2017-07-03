'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Recipe name is required']
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    text: { 
        type: String,
        required: [true, 'Recipe text is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    comments: [
        new Schema({
            user: {
                type: Schema.Types.ObjectId,
                required: [true, 'User is required'],
                ref: 'User'
            },
            text: { 
                type: String,
                required: [true, 'Comment text is required']
            },
            createdDate: {
                type: Date,
                default: Date.now
            }
        })
    ]
});

module.exports = mongoose.model('Recipes', RecipeSchema);