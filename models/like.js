// models/Like.js
const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  targetType: { type: String, enum: ["Post", "Recipe"], required: true },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  }, // reference id
  createdAt: { type: Date, default: Date.now },
});

LikeSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Like", LikeSchema);
