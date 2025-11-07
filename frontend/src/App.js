import React, { useState, useEffect } from "react";
import API_BASE_URL from "./api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import Navbar from "./components/Navbar";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import "./styles/blog.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [blogs, setBlogs] = useState([]);

  // ✅ Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle Google login
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <GoogleOAuthProvider clientId="955196529827-0j3ns7gqlee14u9eqrlhve8piiuqqj8s.apps.googleusercontent.com">
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        {user ? (
          <div className="main-content">
            <BlogForm user={user} fetchBlogs={fetchBlogs} />
            <BlogList blogs={blogs} />
          </div>
        ) : (
          <div className="login-container">
            <h2>Welcome to Simple Blog 📝</h2>
            <p>Login with Google to start posting!</p>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
