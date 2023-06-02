const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {Recipe.create({
    title: "Penne Arabiata",
    level: "Easy Peasy",
    ingredients: [
    "350 g (12 0z) of Penne rigate pasta",
    "1 cloves of garlic",
    "2 or 3 fresh red hot chilli peppers",
    "4 tablespoons of extra virgin olive oil ",
    "2 tablespoons of chopped fresh parsley",
    "fine salt to taste",
    "Grated Pecorino Romano DOP to taste",
    ],
    cuisine: "Italy",
    dishType: "main_course",
    image: "https://www.recipesfromitaly.com/wp-content/uploads/2022/05/penne-all-arrabbiata_spicy-tomato-pasta-recipe-600x900-1b.jpg.webp",
    duration: 25,
    creator: "byDidem",
    created: "01.05.2023",
  })

  .then(() => console.log("my recipe was created"))
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })

  .then(() => {console.log("the recipes were added")  
    const filter = { title: "Rigatoni alla Genovese" }
    const update = { duration: 100}
    return Recipe.findOneAndUpdate(filter, update )})

  .then(() => {console.log("duration of Rigatoni alla Genovese was updated")
    return Recipe.deleteOne( {title: "Carrot Cake"})})
  .then(() => {console.log("Carrot cake was deleted")})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()
  .then(() => console.log("connection was closed!"))


  
