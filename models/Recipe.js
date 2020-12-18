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
    readyInMinutes: { type: Number, default: 20 },
    servings: { type: Number },
    vegetarian: { type: Boolean },
    vegan: { type: Boolean },
    glutenfree: { type: Boolean },
    image: { type: String },
    images: {
      type: [{ type: String }],
      default: [
        "https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png"
      ]
    },
    aggregateLikes: [
      {
        user: {
          type: ObjectId,
          ref: "user"
        }
      }
    ]
  },
  { timestamps: true }
);
module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
