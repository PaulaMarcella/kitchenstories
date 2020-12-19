const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// ------------Routes ------------

// Models
const User = require("../../models/User");
const Like = require("../../models/Like");

// ------------Routes ------------

// ---- Like a recipe
// PUT api/like/:recipeId
router.post("/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    // Check if the like already exists
    const oldLike = await Like.findOne({ recipeId, userId });
    console.log("OLD LIKE: ", oldLike);
    if (oldLike) {
      return res.status(400).json({ msg: "Recipe already liked" });
    }
    // create new Like
    const newLike = new Like({ recipeId, userId });
    await newLike.save();

    // save recipe to User
    const user = await User.findById(userId);
    user.likedRecipes.unshift({ recipeId });
    await user.save();

    // return total likes of recipe
    const totalLikes = await Like.find({ recipeId });
    res.json(totalLikes);
  } catch (err) {
    console.error(err.message);
  }
});

// ---- Unlike a recipe
// DELETE api/like/:recipeId
router.delete("/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    // Delete Like and check if it exists
    const deletedLike = await Like.findOneAndDelete({ recipeId, userId });
    console.log(deletedLike);
    if (!deletedLike) {
      return res.status(400).json({ msg: "Recipe Not Liked yet" });
    }

    // remove RecipeId from User
    const user = await User.findById(userId);
    const removeIndex = user.likedRecipes
      .map((recipe) => recipe.recipeId.toString())
      .indexOf(recipeId);
    user.likedRecipes.splice(removeIndex, 1);
    await user.save();

    // return total likes of recipe
    const totalLikes = await Like.find({ recipeId });
    res.json(totalLikes);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
