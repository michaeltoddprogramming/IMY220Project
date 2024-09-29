import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        localStorage.removeItem("JunKLoginToken");
        navigate('/splash');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav>
      <Link to="/" style={{ padding: '7px' }}>Home</Link>
      <Link to="/profile/:userId" style={{ padding: '7px' }}>Profile</Link>
      <Link to="/playlist/:playlistId" style={{ padding: '7px' }}>Playlist</Link>
      <Link to="/splash" style={{ padding: '7px' }}>Login</Link>
      <button onClick={handleLogout} style={{ padding: '7px' }}>Logout</button>
    </nav>
  );
};

export default Navigation;