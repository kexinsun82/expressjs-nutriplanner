const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const API_URL = "https://api.spoonacular.com/recipes";

async function searchRecipes(query) {
    try {
        const response = await fetch(
            `${API_URL}/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=10&addRecipeInformation=true`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching recipes:", error);
        return [];
    }
}

async function getRandomRecipes() {
    try {
        const response = await fetch(
            `${API_URL}/random?apiKey=${API_KEY}&number=6`
        );
        const data = await response.json();
        return data.recipes || [];
    } catch (error) {
        console.error("Error getting random recipes:", error);
        return [];
    }
}

async function getRecipeInfo(id) {
    try {
        const response = await fetch(
            `${API_URL}/${id}/information?apiKey=${API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting recipe information:", error);
        return null;
    }
}

module.exports = {
    searchRecipes,
    getRandomRecipes,
    getRecipeInfo
};
