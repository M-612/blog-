import React from "react";

function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <div className="author-info">
        <img
          src={blog.author?.picture}
          alt={blog.author?.name}
          className="author-pic"
        />
        <span>{blog.author?.name}</span>
      </div>
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-content">{blog.content}</p>
    </div>
  );
}

export default BlogCard;
