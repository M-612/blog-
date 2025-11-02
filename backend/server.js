import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
