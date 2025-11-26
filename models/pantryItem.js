// models/PantryItem.js
const mongoose = require("mongoose");

const PantryItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }, // optional normalized reference
    name: { type: String, required: true },
    quantity: { type: String }, // "2 kg" or "3 pieces"
    amountNormalized: { value: Number, unit: String }, // optional normalized
    expiryAt: { type: Date },
    openedAt: Date,
    locationInKitchen: String, // e.g., shelf, fridge
    autoExpireNotify: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PantryItemSchema.index({ user: 1, name: 1 });

module.exports = mongoose.model("PantryItem", PantryItemSchema);
