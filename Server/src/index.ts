import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import adminRouter from "./routes/adminRoutes.js";
import commonGetRouter from "./routes/commongetRoutes.js";
import healthcheaker from "./controllers/healtController.js";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const IS_LOCAL = process.env.NODE_ENV === "local";

app.use(cors());
app.use(express.json());

// ─── Local file serving (when NODE_ENV=local, serve uploaded images) ───
if (IS_LOCAL) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsPath = path.resolve(__dirname, "..", "uploads");
    app.use("/uploads", express.static(uploadsPath));
    console.log(`📁 Serving local uploads from: ${uploadsPath}`);
}


// Routes

app.use("/admin", adminRouter);
app.use("/public", commonGetRouter);

//health route
app.get("/health",healthcheaker);




// ─── Database Connection ───
// CRITICAL: Original remote DB connection is preserved.
// When NODE_ENV=local, defaults to local MongoDB with replica set.
// Otherwise, uses MONGO_URI from env (production/staging DB).
const db_uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gdg_db";
const mongoconnect = async () => {

    try {
        await mongoose.connect(db_uri)
        console.log('Connected to MongoDB successfully!')
    } catch (err) {
        console.error('Error connecting to MongoDB:', err)
    }
}

mongoconnect();


app.listen(PORT,"0.0.0.0", () => {
    console.log("server running on port: " + PORT);
})