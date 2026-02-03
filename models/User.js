import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: true
    },
    phoneNumber: {
        type: String,
        match: [/^\+?\d{9,10}$/, "Invalid phone number"]
    },
    address: {
        street: { type: String, trim: true },
        number: Number,
        city: { type: String, trim: true }
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    firstName: { type:String, trim:true },
    lastName: { type:String, trim:true }
  },
  {
    timestamps: true,
    strict: true
  }
);

export const User = mongoose.model("User", userSchema);
