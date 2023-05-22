const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// ITERATION 1 | RECIPE SCHEMA 
const recipeSchema = new Schema({
  _title: {type: String, required: true, unique: true},
  _level: {type: String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  _ingredients: [String],
  _cuisine: {type: String, required: true},
  _dishType: {type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']},
  _image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  _duration: {type: Number, min: 0},
  _creator: {type: String},
  _created: {type: Date, default: date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
