// import mongoose from "mongoose";

// const conversationSchema = new mongoose.Schema({
//     participants: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     messages: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Message'
//     }]
// })
// export const Conversation = mongoose.model('Conversation', conversationSchema);

const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    ],
    lastMessageAt: Date,
    isGroup: { type: Boolean, default: false },
    title: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);