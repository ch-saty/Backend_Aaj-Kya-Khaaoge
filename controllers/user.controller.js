import User from "../models/user.js";
import Post from "../models/post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

// -----------------------------------------
// REGISTER
// -----------------------------------------
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Missing fields",
        success: false,
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ success: false });
  }
};

// -----------------------------------------
// LOGIN
// -----------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Missing fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
  }
};

// -----------------------------------------
// LOGOUT
// -----------------------------------------
export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
  }
};

// -----------------------------------------
// GET PROFILE
// -----------------------------------------
// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId)
//       .populate("posts")
//       .populate("bookmarks");

//     res.status(200).json({ user, success: true });
//   } catch (error) {
//     console.log("GET PROFILE ERROR:", error);
//   }
// };
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // injected by isAuthenticated middleware

    const user = await User.findById(userId).select("-otp -__v");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("GET ME ERROR:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// -----------------------------------------
// UPDATE PROFILE (JSON + optional base64)
// -----------------------------------------
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = { ...req.body };
    console.log("Cloudinary config in controller:", cloudinary.config());

    if (req.body.avatarBase64) {
      const uploaded = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${req.body.avatarBase64}`,
        {
          folder: "profile_pictures",
        }
      );

      updateData.avatarUrl = uploaded.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("PROFILE UPDATE ERROR:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// -----------------------------------------
// SUGGESTED USERS
// -----------------------------------------
export const getSuggestedUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.id } }).select(
      "-passwordHash"
    );

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("SUGGESTED USERS ERROR:", error);
  }
};

// -----------------------------------------
// FOLLOW / UNFOLLOW
// -----------------------------------------
export const followOrUnfollow = async (req, res) => {
  try {
    const me = req.id;
    const target = req.params.id;

    if (me === target) {
      return res.status(400).json({
        message: "You cannot follow yourself",
        success: false,
      });
    }

    const user = await User.findById(me);
    const targetUser = await User.findById(target);

    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.includes(target);

    if (isFollowing) {
      await User.updateOne({ _id: me }, { $pull: { following: target } });
      await User.updateOne({ _id: target }, { $pull: { followers: me } });
      return res.status(200).json({ message: "Unfollowed", success: true });
    }

    await User.updateOne({ _id: me }, { $push: { following: target } });
    await User.updateOne({ _id: target }, { $push: { followers: me } });

    return res.status(200).json({ message: "Followed", success: true });
  } catch (error) {
    console.log("FOLLOW ERROR:", error);
  }
};
