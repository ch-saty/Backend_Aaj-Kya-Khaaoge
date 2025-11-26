// models/Poll.js
const mongoose = require("mongoose");

const PollOption = new mongoose.Schema({
  text: String,
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  votesCount: { type: Number, default: 0 },
});

const PollSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    options: [PollOption],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // invited to vote
    votes: [
      {
        voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        optionIndex: Number,
        votedAt: Date,
      },
    ],
    expiresAt: Date,
    result: { type: mongoose.Schema.Types.Mixed }, // computed summary
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", PollSchema);
