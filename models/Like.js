const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "user"
  },
  recipeId: {
    type: ObjectId,
    ref: "recipe"
  }
});
module.exports = Like = mongoose.model("like", LikeSchema);
