// models/Report.js
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    targetType: String, // 'Post','Recipe','Comment','User'
    targetId: mongoose.Schema.Types.ObjectId,
    reason: String,
    notes: String,
    status: {
      type: String,
      enum: ["open", "reviewing", "resolved", "dismissed"],
      default: "open",
    },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
