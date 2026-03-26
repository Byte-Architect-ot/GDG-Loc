import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gdg_db?replicaSet=rs0";

async function test() {
  try {
    console.log("Connecting to:", uri);
    await mongoose.connect(uri);
    console.log("Connected!");

    // Simple query
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    // Admin count
    const adminCount = await mongoose.connection.collection("admins").countDocuments();
    console.log("Admin count:", adminCount);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

test();
