const express = require("express");
const router = express.Router();
const axios = require("axios");

//Packages
const config = require("config");

// ------------Routes ------------

//  GET api/spoonapi/all
//  Get radom recipes from api
router.get("/all", async (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 1;
    const uri = encodeURI(
      `https://api.spoonacular.com/recipes/random?apiKey=${config.get(
        "spoonacularApiKey"
      )}&number=${limit}`
    );
    const headers = {
      "Content-Type": "application/json",
      "user-agent": "node.js",
      "Access-Control-Allow-Origin": "*"
    };
    const response = await axios.get(uri, { headers });
    return res.json(response.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Recipes found" });
  }
});

//  GET api/recipes/spoonapi/search
//  search by ingredient
router.get("/search", async (req, res) => {
  try {
    const ingredients = req.query.ingredients;
    const limit = req.query.limit ? req.query.limit : 1;
    const uri = encodeURI(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${config.get(
        "spoonacularApiKey"
      )}&ingredients=${ingredients}&number=${limit}`
    );
    const headers = {
      "Content-Type": "application/json",
      "user-agent": "node.js",
      "Access-Control-Allow-Origin": "*"
    };
    const response = await axios.get(uri, { headers });
    return res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  GET api/recipes/spoonapi/similar/:recipeId
//  suggest similar recipes
router.get("/similar/:recipeId", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.spoonacular.com/recipes/${
        req.params.recipeId
      }/similar?apiKey=${config.get("spoonacularApiKey")}`
    );
    const headers = {
      "Content-Type": "application/json",
      "user-agent": "node.js",
      "Access-Control-Allow-Origin": "*"
    };
    const response = await axios.get(uri, { headers });
    return res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  GET api/spoonapi/:recipeId
//  get one by id
router.get("/:recipeId", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.spoonacular.com/recipes/${
        req.params.recipeId
      }/information?apiKey=${config.get("spoonacularApiKey")}`
    );
    const headers = {
      "Content-Type": "application/json",
      "user-agent": "node.js",
      "Access-Control-Allow-Origin": "*"
    };
    const response = await axios.get(uri, { headers });
    return res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
