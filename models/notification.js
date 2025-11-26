// models/Notification.js
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: { type: String }, // 'meal-plan','pantry-expire','follow','message'
    title: String,
    body: String,
    metadata: mongoose.Schema.Types.Mixed,
    isRead: { type: Boolean, default: false },
    sendAt: Date, // for scheduled notifications
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
