import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB (Railway OR Local Compass)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blogdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api/blogs", blogRoutes);

// 👉 Add this for serving React build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
// 👆 Make sure this stays ABOVE app.listen()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Optional root check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Render!");
});
