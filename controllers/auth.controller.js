import User from "../models/user.js";
import { generateOtp, otpExpiry } from "../utils/otp.js";
import { generateToken } from "../utils/jwt.js";

// ---------------------------------------
// SEND OTP
// ---------------------------------------
export const sendOtp = async (req, res) => {
  try {
    const { phone, countryCode = "+91" } = req.body;

    if (!phone) {
      return res.status(400).json({ status: false, message: "Phone required" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        phone,
        countryCode,
        username: `user_${Date.now()}`,
      });
    }

    if (!user.username) {
      user.username = `user_${user._id.toString().slice(-6)}`;
    }

    const otp = generateOtp();
    user.otp = { code: otp, expiry: otpExpiry() };

    await user.save();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "OTP sent successfully",
      data: {
        phone,
        countryCode,
        otp: `Your verification code is ${otp}`,
      },
    });
  } catch (err) {
    console.log("SEND OTP ERROR:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// ---------------------------------------
// VERIFY OTP
// ---------------------------------------
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ status: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.otp.expiry) {
      return res.status(400).json({ status: false, message: "OTP expired" });
    }

    user.isPhoneVerified = true;

    const token = generateToken(user);
    user.authToken = token;

    user.otp = undefined;

    // FIX: ensure username always exists
    if (!user.username) {
      user.username = `user_${user._id.toString().slice(-6)}`;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "OTP Verified",
      data: {
        token,
        user: {
          id: user._id,
          phone: user.phone,
          countryCode: user.countryCode,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          isPhoneVerified: user.isPhoneVerified,
        },
      },
    });
  } catch (err) {
    console.log("VERIFY OTP ERROR:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// ---------------------------------------
// RESEND OTP
// ---------------------------------------
export const resendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        status: false,
        message: "Phone required",
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const otp = generateOtp();
    user.otp = { code: otp, expiry: otpExpiry() };

    // FIX: ensure username always exists
    if (!user.username) {
      user.username = `user_${user._id.toString().slice(-6)}`;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "OTP resent successfully",
      data: {
        phone: user.phone,
        countryCode: user.countryCode,
        otp: `Your verification code is ${otp}`,
      },
    });
  } catch (err) {
    console.log("RESEND OTP ERROR:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
