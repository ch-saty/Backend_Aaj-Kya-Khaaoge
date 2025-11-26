// models/CookRequest.js
const mongoose = require("mongoose");

const CookRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cook: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // person requested
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    customDish: { title: String, notes: String }, // if custom
    amount: Number, // INR
    dateTime: Date,
    address: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed", "cancelled"],
      default: "pending",
    },
    paymentInfo: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CookRequest", CookRequestSchema);
