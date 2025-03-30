let mealPlans = [];

function initializeMealPlans() {
    mealPlans = [];
}

function getMealPlans() {
    return mealPlans;
}

function addFoodToMeal(foodItem) {
    console.log("Adding food item:", foodItem);
    const newFoodItem = {
        id: Date.now(),
        name: foodItem.name,
        calories: parseFloat(foodItem.calories) || 0,
        protein: parseFloat(foodItem.protein) || 0,
        carbs: parseFloat(foodItem.carbs) || 0,
        fat: parseFloat(foodItem.fat) || 0,
        sugar: parseFloat(foodItem.sugar) || 0,
        fiber: parseFloat(foodItem.fiber) || 0,
        sodium: parseFloat(foodItem.sodium) || 0,
        potassium: parseFloat(foodItem.potassium) || 0,
        saturatedFat: parseFloat(foodItem.saturatedFat) || 0,
        cholesterol: parseFloat(foodItem.cholesterol) || 0
    };
    console.log("Processed food item:", newFoodItem);
    mealPlans.push(newFoodItem);
    console.log(`Added ${foodItem.name} to meal plan`);
    console.log('Current meal plans:', JSON.stringify(mealPlans, null, 2));
}

function deleteFoodFromMeal(itemId) {
    mealPlans = mealPlans.filter(item => item.id !== parseInt(itemId));
}

function updateFoodInMeal(itemId, updatedFood) {
    const index = mealPlans.findIndex(item => item.id === parseInt(itemId));
    if (index !== -1) {
        mealPlans[index] = { ...mealPlans[index], ...updatedFood };
    }
}

const MealPlanDB = {
    getMealPlans,
    initializeMealPlans,
    addFoodToMeal,
    deleteFoodFromMeal,
    updateFoodInMeal
};

module.exports = MealPlanDB;
