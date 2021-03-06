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
    if (err.response.status === 402) {
      return res.status(402).json({ msg: "Maximum daily api calls exhausted" });
    }
    return res.status(404).json({ msg: "No Recipes found" });
  }
});

//  GET api/recipes/spoonapi/search
//  search by ingredient
router.get("/search/:query", async (req, res) => {
  try {
    let parameters = "";
    // check diet
    if (req.query.vegan === "true") parameters += "&diet=vegan";
    else if (req.query.vegetarian === "true") parameters += "&diet=vegetarian";
    //check intolerances
    if (req.query.glutenfree === "true" && req.query.dairyfree === "true")
      parameters += "&intolerances=gluten,dairy";
    else if (req.query.glutenfree === "true")
      parameters += "&intolerances=gluten";
    else if (req.query.dairyfree === "true")
      parameters += "&intolerances=dairy";
    const query = req.params.query === " " ? "" : req.params.query;
    const limit = req.query.limit ? req.query.limit : 1;
    const uri = encodeURI(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${config.get(
        "spoonacularApiKey"
      )}&query=${query}&number=${limit}` + parameters
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
    if (err.response.status === 402) {
      return res.status(402).json({ msg: "Maximum daily api calls exhausted" });
    }
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
    if (err.response.status === 402) {
      return res.status(402).json({ msg: "Maximum daily api calls exhausted" });
    }
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
    if (err.response.status === 402) {
      return res.status(402).json({ msg: "Maximum daily api calls exhausted" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
