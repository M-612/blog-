import express from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
});

// ✅ Create new blog
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author?.name || !author?.email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = new Blog({ title, content, author });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err.message });
  }
});

// ✅ Get all users from blogdb (new route)
router.get("/users", async (req, res) => {
  try {
    // Option 1: Use Mongoose model if created
    const users = await User.find();

    // Option 2 (if you don’t have a model yet):
    // const users = await mongoose.connection.db.collection("users").find().toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

export default router;
