import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Profile from './pages/Profile';
import Splash from './pages/Splash';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={ <Splash /> } />
                    <Route path="/profile/:id" element={ <Profile /> } />
                    <Route path="/playlist/:id" element={ <Playlist /> } />
                    <Route path="/home" element={ <Home /> } />
                    <Route path="*" element={ <div>404 Not Found</div> } />
                </Routes>
            </Router>
                
        );
    }
}

export default App;