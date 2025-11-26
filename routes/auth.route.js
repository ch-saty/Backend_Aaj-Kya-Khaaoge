import express from "express";
import { resendOtp, sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
