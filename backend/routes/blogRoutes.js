import express from "express";
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

export default router;
