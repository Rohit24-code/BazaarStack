import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  console.log(mongoUri);
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }
  await mongoose.connect(mongoUri);
  console.log("Connected to DB");
}
