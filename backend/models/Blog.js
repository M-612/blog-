import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String },
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogSchema);
