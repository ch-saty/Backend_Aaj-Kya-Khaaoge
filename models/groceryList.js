// models/GroceryList.js
const mongoose = require("mongoose");

const GroceryItem = new mongoose.Schema({
  name: String,
  quantity: String,
  category: String, // veg, dairy, spices
  bought: { type: Boolean, default: false },
});

const GroceryListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: String,
    items: [GroceryItem],
    linkedMealPlan: { type: mongoose.Schema.Types.ObjectId, ref: "MealPlan" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroceryList", GroceryListSchema);
