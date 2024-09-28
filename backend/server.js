import express from "express";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = `mongodb+srv://${process.env.MONGODBUSERNAME}:${encodeURIComponent(process.env.MONGODBPASSWORD)}@imy220.uipep.mongodb.net/?retryWrites=true&w=majority&appName=IMY220`;
const client = new MongoClient(mongoURI, { serverSelectionTimeoutMS: 5000 });

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("JunK");
    const usersCollection = db.collection("users");

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
        const user = await usersCollection.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user });
      } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).send(err);
      }
    });

    app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

startServer();