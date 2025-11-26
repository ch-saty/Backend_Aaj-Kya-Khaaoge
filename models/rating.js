// models/Rating.js
const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    score: { type: Number, min: 1, max: 5 },
    text: String,
  },
  { timestamps: true }
);

RatingSchema.index({ user: 1, recipe: 1 }, { unique: true });

module.exports = mongoose.model("Rating", RatingSchema);
