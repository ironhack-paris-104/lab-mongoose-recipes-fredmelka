const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Creation of a recipe according to the Recipe Schema
let PearPie = {
  _title: 'Tarte aux Poires',
  _level: 'Easy Peasy',
  _ingredients: ['Pears', 'Butter', 'Sugar', 'Wheat'],
  _cuisine: 'French',
  _dishType: 'dessert',
  _image: 'https://images.media-allrecipes.com/images/75131.jpg',
  _duration: 45,
  _creator: 'Victoria Melka',
  _created: '01/22/1944'
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)

  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      await Recipe.create(PearPie);
    }
    catch (error) {console.log(error)};
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });