import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, trim: true, index: true },
    phone: { type: String, index: true },
    countryCode: { type: String, default: "+91" },

    passwordHash: { type: String },
    authToken: { type: String },

    displayName: { type: String, default: null },
    username: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String, default: null },

    bio: { type: String, default: "" },

    location: {
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
      geo: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] },
      },
    },

    roles: { type: [String], default: ["user"] },

    authProviders: [
      {
        provider: String,
        providerId: String,
      },
    ],

    privacy: {
      profilePublic: { type: Boolean, default: true },
      showLocation: { type: Boolean, default: true },
    },

    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },

    preferences: {
      vegetarian: { type: Boolean, default: false },
      dietType: { type: String, default: null },
      dislikedFoods: { type: [String], default: [] },
      allergies: { type: [String], default: [] },
      regions: { type: [String], default: [] },
    },

    deviceTokens: [
      {
        token: String,
        platform: String,
      },
    ],

    isPhoneVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    otp: {
      code: String,
      expiry: Date,
    },
  },
  { timestamps: true }
);

UserSchema.index({ "location.geo": "2dsphere" });

const User = mongoose.model("User", UserSchema);

export default User;
