const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png"
  },
  likedRecipes: [{ recipeId: { type: ObjectId, ref: "recipe" } }],
  savedRecipes: [{ recipeId: { type: ObjectId, ref: "save" } }]
});
module.exports = User = mongoose.model("user", UserSchema);
