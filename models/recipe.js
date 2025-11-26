// models/Recipe.js
const mongoose = require("mongoose");

const IngredientRef = new mongoose.Schema({
  ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }, // optional
  name: { type: String, required: true }, // free-text fallback
  quantity: { type: String }, // "2 cups", "1 tsp"
  optional: { type: Boolean, default: false },
  substituteSuggestions: [String],
});

const Step = new mongoose.Schema({
  order: { type: Number },
  instruction: { type: String },
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
  tip: String,
});

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: String,
    heroMedia: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    ingredients: [IngredientRef],
    steps: [Step],
    prepTimeMin: Number,
    cookTimeMin: Number,
    totalTimeMin: Number,
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    cuisine: String, // e.g., 'Punjabi'
    region: String,
    tags: [String], // e.g., ['tiffin', 'low-oil', 'kids-friendly']
    moods: [String], // 'comfort','spicy'...
    isVeg: { type: Boolean },
    servings: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
    allowComments: { type: Boolean, default: true },

    likesCount: { type: Number, default: 0 },
    savesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    forksCount: { type: Number, default: 0 },

    // moderation / metadata
    isFeatured: { type: Boolean, default: false },
    isDraft: { type: Boolean, default: false },
    language: { type: String, default: "hi" },
  },
  { timestamps: true }
);

// Text index for recipe search
RecipeSchema.index({
  title: "text",
  description: "text",
  tags: "text",
  "ingredients.name": "text",
});

module.exports = mongoose.model("Recipe", RecipeSchema);
