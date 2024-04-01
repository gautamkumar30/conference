import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { User } from "./models/User.js";
import { Conference } from "./models/Conference.js";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const secret = "ghhpij9f9efiwje0wwjw9j";

mongoose.connect(
  "mongodb+srv://root:RcLnlbILLRf9ATXG@cluster0.oxkjjir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/", (req, res) => {
  try {
    res.status(200).send("All is well !");
  } catch (error) {
    res.status(500).send("Error thrown");
  }
});

app.get("/test", (req, res) => {
  try {
    res.status(200).send("All is well  from test!");
  } catch (error) {
    res.status(500).send("Error thrown");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({
      username,
      //   password: bcrypt.hashSync(password, salt),
      password,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (password === userDoc.password) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({ id: userDoc._id, username });
      });
      //   res.json({ message: "Same user" });
    } else {
      //   alert("password mismatch");
      res.send("password mismatch");
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, (err, info) => {
    // if (err) throw err;
    if (err) res.json("Error occured");
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("OK");
});

app.post("/create-conference", async (req, res) => {
  try {
    console.log(req.body);

    const conferenceDoc = await Conference.create(req.body);

    res.status(201).json(conferenceDoc);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/get-jeo-data", (req, res) => {
  res.status(200).json({ name: "Jeo", age: "20", gender: "male" });
});

app.listen(4000);
