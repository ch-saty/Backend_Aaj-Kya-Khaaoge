// models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["recipe", "photo", "video", "status"],
      required: true,
    },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }, // optional
    text: String,
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    tags: [String],
    location: { city: String, state: String },
    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PostSchema.index({ text: "text", tags: "text" });

const Post = mongoose.model("Post", PostSchema);

export default Post;
