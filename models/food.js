const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.CALORIENINJAS_API_KEY; 
const API_URL = "https://api.calorieninjas.com/v1/nutrition?query=";

async function searchFood(query) {
    try {
        const apiKey = process.env.CALORIENINJAS_API_KEY;
        if (!apiKey) {
            throw new Error("API key not found");
        }

        const response = await fetch(
            `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
            {
                headers: {
                    "X-Api-Key": apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.items || data.items.length === 0) {
            return [];
        }

        return data.items.map((item) => ({
            name: item.name,
            calories: parseFloat(item.calories) || 0,
            protein: parseFloat(item.protein_g) || 0,
            carbs: parseFloat(item.carbohydrates_total_g) || 0,
            fat: parseFloat(item.fat_total_g) || 0,
            fiber: parseFloat(item.fiber_g) || 0,
            sugar: parseFloat(item.sugar_g) || 0,
            servingSize: parseFloat(item.serving_size_g) || 0,
            sodium: parseFloat(item.sodium_mg) || 0,
            potassium: parseFloat(item.potassium_mg) || 0,
            saturatedFat: parseFloat(item.fat_saturated_g) || 0,
            cholesterol: parseFloat(item.cholesterol_mg) || 0
        }));
    } catch (error) {
        console.error("Error fetching food data:", error);
        return [];
    }
}

const FoodDB = {
    searchFood
};

module.exports = FoodDB;
