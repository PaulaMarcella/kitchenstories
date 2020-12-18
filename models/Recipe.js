const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true,
      default: "No instructions added yet"
    },
    likes: [
      {
        user: {
          type: ObjectId,
          ref: "user"
        }
      }
    ],
    images: {
      type: [{ type: String }],
      default: [
        "https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png"
      ]
    }
  },
  { timestamps: true }
);
module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
