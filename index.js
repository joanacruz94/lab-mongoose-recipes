const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to the database:");
    return mongoose.connection.dropDatabase();    
  })
  .then(() => {
    return Recipe.create({
      title: 'Ovos Cozidos',
      level: 'Easy Peasy',
      ingredients: ['water', 'eggs'],
      cuisine: 'all',
      dishType: 'Snack',
      duration: 10,
      creator: 'Joana'
    }); 
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find({}, {"title" : 1, "_id" : 0});
  })
  .then((allRecipes) => {
    console.log(allRecipes);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({"title" : "Rigatoni alla Genovese"}, {"$set" : {"duration" : 100}});
  })
  .then(() => {
    console.log("Sucess updating");
  })
  .then(() => {
    return Recipe.deleteOne({"title" : "Carrot Cake"})
  })
  .then(() => {
    console.log("Sucess deleting");
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Has disconnected');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

