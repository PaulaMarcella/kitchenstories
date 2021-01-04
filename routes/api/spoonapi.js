const express = require("express");
const router = express.Router();

//Packages
const request = require("request");
const config = require("config");

// ------------Routes ------------

//  GET api/spoonapi/all
//  Get radom recipes from api
router.get("/all", (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 2;
    const options = {
      uri: `https://api.spoonacular.com/recipes/random?apiKey=${config.get(
        "spoonacularApiKey"
      )}&number=${limit}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      // if (response.statusCode !== 200) {
      //   res.status(404).json({ msg: "No Recipes found" });
      // }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  GET api/recipes/spoonapi/search
//  search by ingredient
router.get("/search", (req, res) => {
  let ingredients = req.query.ingredients;
  try {
    const options = {
      uri: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${config.get(
        "spoonacularApiKey"
      )}&ingredients=${ingredients}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No Recipes found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  GET api/recipes/spoonapi/similar/:recipeId
//  suggest similar recipes
router.get("/similar/:recipeId", (req, res) => {
  try {
    const options = {
      uri: `https://api.spoonacular.com/recipes/${
        req.params.recipeId
      }/similar?apiKey=${config.get("spoonacularApiKey")}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No Recipes found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  GET api/spoonapi/:recipeId
//  get one by id
router.get("/:recipeId", (req, res) => {
  try {
    const options = {
      uri: `https://api.spoonacular.com/recipes/${
        req.params.recipeId
      }/information?apiKey=${config.get("spoonacularApiKey")}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "Recipe not found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
