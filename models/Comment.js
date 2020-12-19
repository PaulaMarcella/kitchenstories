const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    creator: {
      type: ObjectId,
      ref: "user"
    },
    recipeId: {
      type: ObjectId,
      ref: "recipe"
    }
  },
  { timestamps: true }
);
module.exports = Comment = mongoose.model("comment", CommentSchema);
