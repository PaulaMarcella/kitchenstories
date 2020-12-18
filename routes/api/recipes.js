const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Packages
const { check, validationResult } = require("express-validator");
const config = require("config");

// ------------Routes ------------

// Models
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

// ------------Routes ------------

// ----Create Recipe
// POST api/recipes
// private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newRecipe = new Recipe({
        title: req.body.title,
        creator: req.user.id,
        instructions: req.body.instructions,
        readyInMinutes: req.body.readyInMinutes,
        servings: req.body.servings,
        vegetarian: req.body.vegetarian,
        vegan: req.body.vegan,
        image: req.body.image
      });
      const recipe = await newRecipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ----Get All Recipe
// GET api/recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ----Get one Recipe by id
// GET api/recipes
router.get("/details/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
