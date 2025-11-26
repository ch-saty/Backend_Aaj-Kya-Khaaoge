import express from "express";
import {
  register,
  getMe,
  login,
  logout,
  getSuggestedUsers,
  followOrUnfollow,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMe);

router.put("/update-profile", isAuthenticated, updateProfile);
router.get("/suggested", isAuthenticated, getSuggestedUsers);
router.post("/follow/:id", isAuthenticated, followOrUnfollow);

export default router;
