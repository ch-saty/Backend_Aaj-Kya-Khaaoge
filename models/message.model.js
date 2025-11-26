import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     message: {
//         type: String,
//         required: true
//     }
// });
// export const Message = mongoose.model('Message', messageSchema);

const MessageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: String,
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);