import React from "react";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h2>📝 Simple Blog</h2>
      {user && (
        <div className="nav-user">
          <img src={user.picture} alt={user.name} className="nav-pic" />
          <span>{user.name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
