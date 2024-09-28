import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

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

    app.get("/api/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.json(users);
      } catch (err) {
        console.error("Error fetching users:", err);
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