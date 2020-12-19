const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user"
  },
  bio: {
    type: String,
    required: true,
    default: "No bio added yet..."
  },
  savedRecipes: [{ recipeId: { type: ObjectId, ref: "save" } }],
  created: {
    type: [
      {
        type: ObjectId,
        ref: "recipe"
      }
    ],
    default: []
  },
  favoritefoods: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default:
      "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png"
  },
  social: {
    youtube: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    }
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
