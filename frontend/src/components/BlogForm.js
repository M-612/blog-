import React, { useState } from "react";
import API_BASE_URL from "../api";

function BlogForm({ user, fetchBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_BASE_URL}/api/blogs`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        author: {
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      }),
    });
    if (response.ok) {
      setTitle("");
      setContent("");
      fetchBlogs(); // refresh list after posting
    } else {
      alert("Error posting blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Blog</button>
    </form>
  );
}

export default BlogForm;
