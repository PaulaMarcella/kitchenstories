const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Save = require("../../models/Save");

// ------------Routes ------------

// ---- Save a recipe
// PUT api/save/:recipeId
router.post("/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    // Check if alrady saved
    const oldSave = await Save.findOne({ recipeId, userId });
    if (oldSave) {
      return res.status(400).json({ msg: "Recipe is already saved" });
    }
    // create new Save
    const newSave = new Save({ recipeId, userId });
    await newSave.save();

    // save recipe to User
    const user = await User.findById(userId);
    user.savedRecipes.unshift({ recipeId });
    await user.save();

    res.json({ msg: "Recipe saved successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

// ---- Removed a recipe from saved list
// DELETE api/save/:recipeId
router.delete("/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    // Remove Recipe from saved list
    const deletedSave = await Save.findOneAndDelete({ recipeId, userId });
    console.log(deletedSave);
    if (!deletedSave) {
      return res.status(400).json({ msg: "Recipe not saved yet" });
    }

    // remove RecipeId from User
    const user = await User.findById(userId);
    const removeIndex = user.savedRecipes
      .map((recipe) => recipe.recipeId)
      .indexOf(recipeId);
    user.savedRecipes.splice(removeIndex, 1);
    await user.save();
    res.json({ msg: "Recipe removed from Saved List" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
