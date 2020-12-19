const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const SaveSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "user"
  },
  recipeId: {
    type: ObjectId,
    ref: "recipe"
  }
});
module.exports = Save = mongoose.model("save", SaveSchema);
