// models/Ingredient.js
const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true }, // e.g., "potato"
    aliases: [String], // "aloo"
    category: String, // vegetable, spice, dairy etc.
    unitHints: [String], // pieces, grams, cups
    seasonal: [String], // months or seasons
    normalizedName: { type: String, index: true },
  },
  { timestamps: true }
);

IngredientSchema.index({ name: "text", aliases: "text" });

module.exports = mongoose.model("Ingredient", IngredientSchema);
