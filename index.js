import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
connectDB();
// console.log("Cloudinary config:", {
//   name: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing",
//   secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing",
// });

// Use Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Aaj Kya Khaaoge Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
