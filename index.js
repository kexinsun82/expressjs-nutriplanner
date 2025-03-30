const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const FoodDB = require("./models/food.js");
const MealPlanDB = require("./models/mealplan.js");
const { getRecipes, searchRecipes, getRandomRecipes, getRecipeInfo } = require("./models/recipes.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

MealPlanDB.initializeMealPlans();

// index
app.get("/", async (req, res) => {
  const randomRecipes = await getRandomRecipes();
  res.render("index", { randomRecipes });
});

// food search
app.get("/food", async (req, res) => {
  const query = req.query.q || "";
  const foodList = query ? await FoodDB.searchFood(query) : [];
  const mealPlans = await MealPlanDB.getMealPlans();
  res.render("food", { foods: foodList, query, mealPlans });
});

// add food to meal plan
app.post("/addfood", async (req, res) => {
  console.log("Received addfood request:", req.body);
  const { 
    name, 
    calories, 
    protein, 
    carbs, 
    fat, 
    sugar, 
    fiber, 
    sodium, 
    potassium, 
    saturatedFat, 
    cholesterol 
  } = req.body;
  
  const foodItem = {
    name,
    calories: parseFloat(calories) || 0,
    protein: parseFloat(protein) || 0,
    carbs: parseFloat(carbs) || 0,
    fat: parseFloat(fat) || 0,
    sugar: parseFloat(sugar) || 0,
    fiber: parseFloat(fiber) || 0,
    sodium: parseFloat(sodium) || 0,
    potassium: parseFloat(potassium) || 0,
    saturatedFat: parseFloat(saturatedFat) || 0,
    cholesterol: parseFloat(cholesterol) || 0
  };
  
  await MealPlanDB.addFoodToMeal(foodItem);
  res.redirect("/meal-planner");
});

// delete food
app.post("/deletefood", async (req, res) => {
  console.log("Received deletefood request:", req.body);
  const { itemId } = req.body;
  await MealPlanDB.deleteFoodFromMeal(itemId);
  res.redirect("/meal-planner");
});

// meal plan
app.get("/meal-planner", async (req, res) => {
  console.log("Received meal-planner request");
  const mealPlans = await MealPlanDB.getMealPlans();
  console.log("Retrieved meal plans:", mealPlans);
  
  // calculate the total of all nutrition info
  const totals = mealPlans.reduce((account, item) => {
    account.totalCalories += parseFloat(item.calories) || 0;
    account.totalProtein += parseFloat(item.protein) || 0;
    account.totalCarbs += parseFloat(item.carbs) || 0;
    account.totalFat += parseFloat(item.fat) || 0;
    account.totalSugar += parseFloat(item.sugar) || 0;
    account.totalFiber += parseFloat(item.fiber) || 0;
    account.totalSodium += parseFloat(item.sodium) || 0;
    account.totalPotassium += parseFloat(item.potassium) || 0;
    account.totalSaturatedFat += parseFloat(item.saturatedFat) || 0;
    account.totalCholesterol += parseFloat(item.cholesterol) || 0;
    return account;
  }, {
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalSugar: 0,
    totalFiber: 0,
    totalSodium: 0,
    totalPotassium: 0,
    totalSaturatedFat: 0,
    totalCholesterol: 0
  });

  res.render("meal-planner", {
    items: mealPlans,
    ...totals
  });
});

// recipes
app.get("/recipes", async (req, res) => {
  const query = req.query.q || "";
  const recipes = query ? await searchRecipes(query) : [];
  const randomRecipes = await getRandomRecipes();
  res.render("recipes", { recipes, query, randomRecipes });
});

// recipe details
app.get("/recipe-details/:id", async (req, res) => {
  const recipe = await getRecipeInfo(req.params.id);
  if (recipe) {
    // search for the nutrition info of recipe
    const nutritionInfo = await FoodDB.searchFood(recipe.title);
    res.render("recipe-details", { 
      recipe,
      nutritionInfo: nutritionInfo[0] || null
    });
  } else {
    res.redirect("/recipes");
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
