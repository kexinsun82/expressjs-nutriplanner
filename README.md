# NutriPlanner

NutriPlanner is a meal planning and nutrition tracking web app built with **Express.js**, **Pug**, and **Bootstrap 5**. It allows users to:

- Search for food and view detailed nutrition info
- Add food items to a personal meal planner
- View daily nutrition summary
- Explore healthy recipe recommendations

---

## Project Structure (Views)

### `views/index.pug`
Landing page of the app. It features:
- A food search bar
- A list of random healthy recipes from the Spoonacular API 

### `views/food.pug`
Display food search results based on user queries:
- Shows detailed nutritional information from the CalorieNinjas API
- Allows adding individual food items to the meal plan
- Recommends healthy food items with quick links

### `views/recipes.pug`
Search recipes by ingredients, display recipe search results based on user queries:
- Shows detailed recipe information from the Spoonacular API 
- Allows adding individual food items to the meal plan by the recipe-details page
- Recommends healthy recipes with quick links

### `views/recipe-details.pug`
Shows detailed recipe information:
- The recipe image and show information(cooking time, servings, health score, the original recipe and search nutrition info)
- By the 'search nutrition info' button to search related foods and add them to your meal plan
- Recipe's ingredients and instructions

### `views/meal-planner.pug`
Your personal meal planner dashboard:
- Left column: A nutrition summary showing totals (calories, protein, fat, etc.)
- Right column: List of added food items with delete functionality

---

## How to Run the App

```
git clone https://github.com/your-username/nutriplanner.git
cd nutriplanner
npm install
Create a .env file in the root with your API keys and settings. Example:
CALORIENINJAS_API_KEY=your_CALORIENINJAS_api_key
SPOONACULAR_API_KEY=your_SPOONACULAR_api_key
npm run dev
http://localhost:PORT
```
---     
  
## Tech Stack
- Node.js + Express
- Pug 
- Bootstrap 5
- Spoonacular API (for the recipe data)
- CalorieNinjas API (for the food data)
