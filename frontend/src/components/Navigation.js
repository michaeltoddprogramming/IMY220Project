import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/" style={{ padding: '7px' }}>Home</Link>
        <Link to="/profile/:userId" style={{ padding: '7px' }}>Profile</Link>
        <Link to="/playlist/:playlistId" style={{ padding: '7px' }}>Playlist</Link>
        <Link to="/splash" style={{ padding: '7px' }}>Login</Link>
      </nav>
    );
  }
}

export default Navigation;