const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config(); 

const url = `mongodb+srv://${process.env.MONGODBUSERNAME}:${encodeURIComponent(process.env.MONGODBPASSWORD)}@imy220.uipep.mongodb.net/?retryWrites=true&w=majority&appName=IMY220`;
const client = new MongoClient(url);

const app = express();
app.use(express.json()); 
app.use(cookieParser()); 

app.use(express.static('./frontend/public'));

async function startServer() {
    await client.connect();
    console.log("--------------------------------\n");
    console.info("Connected to JunK Database :)\n");
    console.log("--------------------------------\n");

    const db = client.db('JunK');
    const SongCollection = db.collection('songs');
    const PlaylistCollection = db.collection('playlists');
    const UserCollection = db.collection('users');

    app.get('/api/songs', async (req, res) => {
        try {
            const songs = await SongCollection.find().sort({ dateAdded: -1 }).toArray();
            res.json(songs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/playlists/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const playlistIDs = user.playlistIDs || [];
    
            const playlists = await PlaylistCollection.find({ playlistID: { $in: playlistIDs } }).toArray();
    
            res.json(playlists);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/playlist/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });
            
            if (!playlist) {
                return res.status(404).send("playlist not found");
            }

    
            res.json(playlist);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/playlist/:id/songs', async (req, res) => {
        const { id } = req.params;
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });

            if (!playlist) {
                return res.status(404).send("Playlist not found");
            }

            const songIDs = playlist.songIDs || [];

            const songs = await SongCollection.find({ songID: { $in: songIDs } }).toArray();

            res.json(songs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post('/api/register', async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const count = await UserCollection.countDocuments();
            const newId = `user0${count + 1}`;
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = {
                _id: newId.toString(), 
                description: '', 
                imageUrl: '/assets/images/.png', 
                username, 
                email,
                password: hashedPassword, 
                playlistIDs: [],
                followerIDs: [],
                followingIDs: []
            };
            await UserCollection.insertOne(newUser);
            res.status(201).send("User registered successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    });
    
    app.post("/api/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("Login attempt with email:", email);
            const user = await UserCollection.findOne({ email });
            if (!user) {
                console.log("User not found with email:", email);
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("Password valid:", isPasswordValid);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
    
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });
            res.json({ message: "Login successful", token, userId: user._id });
        } catch (err) {
            console.error("Error logging in user:", err);
            res.status(500).send(err);
        }
    });

    app.post('/api/logout', (req, res) => {
        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).send("Logged out successfully");
    });

    app.delete('/api/user/:id', async (req, res) => {
        const { id } = req.params;
        const loggedInUserId = req.headers['user-id']; 
    
        if (id !== loggedInUserId) {
            return res.status(403).json({ message: "You can only delete your own account" });
        }
    
        try {
            const result = await UserCollection.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Account deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/user/:userId/following/playlists', async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await UserCollection.findOne({ _id: userId });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const friends = user.followingIDs || [];

            const playlists = await PlaylistCollection.find({ userIDs: { $in: friends }}).toArray();
            res.json(playlists);
        } catch (err) {
            console.error('Error fetching playlists:', err);
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id/followers', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const followers = await UserCollection.find({ _id: { $in: user.followerIDs } }).toArray();
            res.json(followers);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/api/users/:id/following', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            const following = await UserCollection.find({ _id: { $in: user.followingIDs } }).toArray();
            res.json(following);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put('/api/users/:id', async (req, res) => {
        const { id } = req.params;
        const { username, description } = req.body;
        try {
            const result = await UserCollection.updateOne(
                { _id: id },
                { $set: { username, description } }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({message: "User not found" });
            }
            res.status(200).json({ message: "Profile updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/playlist/:id', async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        const loggedInUserId = req.headers['user-id']; 
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: id });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            if (!playlist.userID.includes(loggedInUserId)) {
                return res.status(403).json({ message: "You are not the owner of this playlist" });
            }
    
            const result = await PlaylistCollection.updateOne(
                { playlistID: id },
                { $set: { name, description } }
            );
    
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            res.status(200).json({ message: "Playlist updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.put('/api/:id/createplaylist', async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const user = await UserCollection.findOne({ _id: id });
            if (!user) {
               return res.status(404).json ({ message: "User not found" });
            }

            const count = await PlaylistCollection.countDocuments();
            const newId = `PL0${count + 1}`;

            const newPlaylist = {
                playlistID: newId.toString(),
                name,
                description, 
                imageUrl: '/assets/images/placeholder.png', 
                comments: [],
                userIDs: [
                    id
                ],
                songIDs: [] };

            await PlaylistCollection.insertOne(newPlaylist);

            await UserCollection.updateOne(
                { _id: id },
                { $push: { playlistIDs: newId.toString() } }
            );

            res.status(201).send("Playlist created successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete('/api/playlists/:playlistId/remove', async (req, res) => {
        const { playlistId } = req.params;
        const loggedInUserId = req.headers['user-id'];
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            if (!playlist.userIDs.includes(loggedInUserId)) {
                return res.status(403).json({ message: "You do not have this playlist in your library" });
            }
    
            await UserCollection.updateOne(
                { _id: loggedInUserId },
                { $pull: { playlistIDs: playlistId } }
            );
    
            res.status(200).json({ message: "Playlist removed from user library successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/playlists/:playlistId/add', async (req, res) => {
        const { playlistId } = req.params;
        const { trackId } = req.body;
    
        try {
            const playlist = await PlaylistCollection.findOne({ playlistID: playlistId });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }
    
            await PlaylistCollection.updateOne(
                { playlistID: playlistId },
                { $push: { songIDs: trackId } }
            );

            await SongCollection.updateOne(
                { songID: trackId },
                { $addToSet: { playlistIDs: playlistId } }
            );
    
            res.status(200).json({ message: "Song added to playlist successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/createsong', async (req, res) => {
        const { title, link } = req.body;
    
        if (!title || !link) {
            return res.status(400).json({ message: 'Title and link are required' });
        }
    
        try {
            const songID = generateSongID(title);
    
            const newSong = {
                songID,
                title,
                link,
                playlistIDs: [],
                userIDs: [],
                dateAdded: new Date()
            };
    
            await SongCollection.insertOne(newSong);
    
            res.status(201).json({ message: 'Song created successfully', song: newSong });
        } catch (error) {
            console.error('Error creating song:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    function generateSongID(title) {
        return title
            .split(' ')
            .map(word => word[0].toLowerCase())
            .join('');
    }

    app.delete('/api/songs/:songID', async (req, res) => {
        const { songID } = req.params;
    
        try {
            const result = await SongCollection.deleteOne({ songID });
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Song not found' });
            }
    
            res.status(200).json({ message: 'Song deleted successfully' });
        } catch (error) {
            console.error('Error deleting song:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('/api/search', async (req, res) => {
        const { term, type } = req.query;
    
        try {
            let results;
            switch (type) {
                case 'playlists':
                    results = await PlaylistCollection.find({ name: { $regex: term, $options: 'i' } }).toArray();
                    break;
                case 'songs':
                    results = await SongCollection.find({ title: { $regex: term, $options: 'i' } }).toArray();
                    break;
                case 'users':
                    results = await UserCollection.find({ username: { $regex: term, $options: 'i' } }).toArray();
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid search type' });
            }
            res.status(200).json(results);
        } catch (error) {
            console.error('Error searching:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: './frontend/public' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("--------------------------------\n");
        console.log(`Hosted on port ${PORT}\n`);
        console.log("--------------------------------\n");
    })
};

startServer();