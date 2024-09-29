import express from "express";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = `mongodb+srv://${process.env.MONGODBUSERNAME}:${encodeURIComponent(process.env.MONGODBPASSWORD)}@imy220.uipep.mongodb.net/?retryWrites=true&w=majority&appName=IMY220`;
const client = new MongoClient(mongoURI, { serverSelectionTimeoutMS: 5000 });

app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());



async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("JunK");
    const usersCollection = db.collection("users");
    const playlistsCollection = db.collection("playlists");
    const songsCollection = db.collection("songs");

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null) return res.sendStatus(401);

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    };

    app.post("/api/register", async (req, res) => {
      try {
        const { signupUsername, signupEmail, signupPassword } = req.body;

        console.log("Received registration request:", req.body);

        if (!signupUsername || !signupEmail || !signupPassword) {
          console.log("Missing required fields");
          return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await usersCollection.findOne({ email: signupEmail });
        if (existingUser) {
          console.log("Email already registered:", signupEmail);
          return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(signupPassword, 10);
        console.log("Hashed password:", hashedPassword);

        const newUser = { username: signupUsername, email: signupEmail, password: hashedPassword, playlists: [] };
        const result = await usersCollection.insertOne(newUser);
        const createdUser = await usersCollection.findOne({ _id: result.insertedId });
        console.log("User created:", createdUser);
        res.status(201).json(createdUser);
      } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send(err);
      }
    });

    app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log("Login attempt with email:", email);
        const user = await usersCollection.findOne({ email });
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
        res.json({ message: "Login successful", token, userId: user._id });
      } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).send(err);
      }
    });

    app.post("/api/logout", (req, res) => {
      res.redirect('/welcome');
    });

    app.get("/api/user", authenticateToken, async (req, res) => {
      try {
        const userId = new ObjectId(req.user.userId); 
        const user = await usersCollection.findOne({ _id: userId }, { projection: { password: 0 } }); // Exclude password from the result
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (err) {
        console.error("Error fetching user information:", err);
        res.status(500).send(err);
      }
    });

    app.get("/api/playlists/:userId", authenticateToken, async (req, res) => {
      try {
        const userId = new ObjectId(req.params.userId); 
        const playlists = await playlistsCollection.find({ userId }).toArray();
        const playlistsWithSongs = await Promise.all(playlists.map(async (playlist) => {
          const songs = await songsCollection.find({ _id: { $in: playlist.songs } }).toArray();
          return { ...playlist, songs };
        }));
        res.json(playlistsWithSongs);
      } catch (err) {
        console.error("Error fetching playlists:", err);
        res.status(500).send(err);
      }
    });

    app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

startServer();