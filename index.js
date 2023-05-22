const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Creation of a single recipe object following the Recipe Schema
let PearPie = {
  title: 'Tarte aux Poires',
  level: 'Easy Peasy',
  ingredients: ['Pears', 'Butter', 'Sugar', 'Wheat'],
  cuisine: 'French',
  dishType: 'dessert',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 45,
  creator: 'Victoria Melka',
  created: '01/22/1944'
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
      await Recipe.insertMany(data);
      await Recipe.create(PearPie);

      let recipeList = await Recipe.find({});
      for (let oneRecipe of recipeList) {console.log(oneRecipe.title)};
    }
    catch (error) {console.log(error)};
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });