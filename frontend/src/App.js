import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Splash from './pages/Splash';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Playlist from './pages/Playlist';

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <div>Page Not Found</div> },
  { path: "/profile/:userId", element: <Profile />, errorElement: <div>Page Not Found</div> },
  { path: "/playlist/:playlistId", element: <Playlist />, errorElement: <div>Page Not Found</div> },
  { path: "/splash", element: <Splash />, errorElement: <div>Page Not Found</div> }
])

class App extends React.Component {
  render() {
    return (
      <RouterProvider router={router}>
      </RouterProvider>           
    );
  }
}

export default App;