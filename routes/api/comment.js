const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth");

// Models
const Comment = require("../../models/Comment");

// ------------Routes ------------

// --- List all comments of a recipe
// GET api/comment/
router.get("/:recipeId", async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId })
      .sort({ createdAt: -1 })
      .populate("creator", ["username", "image"]);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ---- Add a Comment
// POST api/comment/:recipeId
router.post("/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    // create and save Comment
    const newComment = new Comment({
      recipeId,
      creator: userId,
      text: req.body.text
    });
    await newComment.save();

    // return comments of recipe
    const comments = await Comment.find({ recipeId })
      .sort({ createdAt: -1 })
      .populate("creator", ["username", "image"]);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ---- Delete own Comment
// DELETE api/comment/:commentId
router.delete("/:recipeId/:commentId", auth, async (req, res) => {
  try {
    //  Check if creator is logged in user
    const commentToDelete = await Comment.findById(req.params.commentId);
    if (!commentToDelete) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    console.log(commentToDelete.creator, req.user.id);
    if (commentToDelete.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized to delete comment" });
    }
    await commentToDelete.remove();

    // return comments of recipe
    const comments = await Comment.find({ recipeId: req.params.recipeId })
      .sort({ createdAt: -1 })
      .populate("creator", ["username", "image"]);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
