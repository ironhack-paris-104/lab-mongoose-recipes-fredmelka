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

  // ITERATIONS 2 & 3 / CREATE ONE AND MANY DOCUMENTS TO DATABASE
  .then(async () => {
    try {

      // ITERATION 3 | Insert Recipes from data.json
      await Recipe.insertMany(data);

      // ITERATION 2 | Inset one Single Recipe from 
      await Recipe.create(PearPie);

      // SELF ADDED | Counts Number of Recipes written in Database
      console.log(await Recipe.countDocuments({}));
      
      let recipeList = await Recipe.find({});
      for (let oneRecipe of recipeList) {console.log(oneRecipe.title)};
    }
    catch (error) {console.log(error)};
  })

  // ITERATIONS 4 | UDPATE ONE DOCUMENT FROM DATABASE
  .then (async () => {
    try {

      // ITERATION 4 | FIND ONE BY ONE SINGLE FIELD AND UPDATE
      let updatedRecipe = await Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese"},
        {duration: 100},
        {new: true}
      );
      console.log(`Recipe updated ${updatedRecipe} !`);
    }
    catch (error) {console.log(error);}
  })

  // ITERATION 5 | DELETE ONE DOCUMENT FROM DATABASE
  .then (async () => {
    try {

      let deleteRecipe = await Recipe.deleteOne({title: 'Carrot Cake'});
      console.log(deleteRecipe);
    }
    catch (error) {console.log(error)}
  })

  .catch(error => {console.error('Error connecting to the database', error);})
  
  // ITERATION 6 | DISCONNECTION FROM DATABASE
  .finally(()=> {mongoose.disconnect(); console.log('disconnected!')});