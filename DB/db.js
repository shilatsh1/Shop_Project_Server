import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    const mongoURI = mongoUri;

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected: gocode-shop");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop the app if connection fails
  }
};