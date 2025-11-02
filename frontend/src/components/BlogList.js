import React from "react";
import BlogCard from "./BlogCard";

function BlogList({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs available yet.</p>;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
