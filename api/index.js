import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { User } from "./models/User.js";
import { Conference } from "./models/Conference.js";
import { Attendee } from "./models/Attendee.js";
import { Paper } from "./models/Paper.js";

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

    console.log(password === userDoc.password);

    if (password === userDoc.password) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .cookie("token", token)
          .json({ id: userDoc._id, username });
      });
      //   res.json({ message: "Same user" });
    } else {
      //   alert("password mismatch");
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
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("OK");
});

app.get("/conference", async (req, res) => {
  try {
    const conferenceDocs = await Conference.find().populate("organizer");

    res.status(200).json(conferenceDocs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/conference/create", async (req, res) => {
  try {
    const formData = req.body;

    const conferenceDoc = await Conference.create({
      title: formData.title,
      date: formData.date,
      venue: formData.venue,
      registrationAmount: formData.registrationAmount,
      description: formData.description,
      theme: formData.theme,
      organizer: formData.organizer,
    });

    res.status(200).json(conferenceDoc);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/conference/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conferenceDoc = await Conference.findById(id).populate("organizer", [
      "username",
    ]);

    res.status(200).json(conferenceDoc);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post(
  "/conference/:conferenceId/register-attendee/:userId",
  async (req, res) => {
    try {
      const { conferenceId, userId } = req.params;

      const attendeeDoc = await Attendee.create({
        userId,
        conferenceId,
      });

      res.status(201).json(attendeeDoc);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

app.get(
  "/conference/:conferenceId/check-user-status/:userId",
  async (req, res) => {
    try {
      const { conferenceId, userId } = req.params;

      const conferenceDoc = await Conference.findById(conferenceId).populate(
        "organizer",
        []
      );

      const objectIdString = conferenceDoc.organizer._id.toString();

      console.log("c - " + objectIdString);
      console.log("u - " + userId);
      console.log(objectIdString === userId);

      // if (objectIdString === userId) {
      //   res.json({ role: "organizer" });
      // }
      const attendeeDoc = await Attendee.findOne({
        userId: userId,
        conferenceId: conferenceId,
      });

      if (objectIdString === userId) {
        res.status(200).json({ role: "organizer" });
      } else {
        console.log("Entering here");
        if (attendeeDoc) {
          res.status(200).json({
            role: "attendee",
            data: attendeeDoc,
          });
        } else {
          console.log("Entered inside");
          0;
          const tempMsg = {
            role: "non-attendee",
            message: "Not a registered member",
          };
          console.log(tempMsg);
          res.status(200).json(tempMsg);
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

app.post("/conference/:conferenceId/submit-paper", async (req, res) => {
  try {
    const { conferenceId } = req.params;
    const { userId, title, link } = req.body;

    console.log(req.body);

    const paperDoc = await Paper.create({
      userId,
      conferenceId,
      title,
      link,
    });

    if (paperDoc) {
      res.status(201).json(paperDoc);
    } else {
      res.status(400).json({
        message: "Paper not submitted",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/conference/:conferenceId/papers", async (req, res) => {
  try {
    const { conferenceId } = req.params;
    const paperDocs = await Paper.find({ conferenceId: conferenceId }).populate(
      "userId",
      ["username"]
    );
    console.log(paperDocs);
    res.status(200).json(paperDocs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/papers/:paperId/update-rating", async (req, res) => {
  try {
    const { paperId } = req.params;
    const { userRating } = req.body;

    const paperDoc = await Paper.findById(paperId);

    console.log(paperDoc);

    const newRating =
      (paperDoc.totalRating * paperDoc.totalRaters + userRating) /
      (paperDoc.totalRaters + 1);

    console.log(newRating);

    const updatedPaperDoc = await Paper.updateOne(
      {
        _id: paperId,
      },
      [
        {
          $set: {
            totalRating: newRating,
          },
        },
        {
          $set: {
            totalRaters: paperDoc.totalRaters + 1,
          },
        },
      ]
    );

    res.status(200).json(updatedPaperDoc);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/conference/organized", async (req, res) => {
  try {
    const { userId } = req.body;
    const conferenceDocs = await Conference.find({
      // organizer: "66083be6a678cb9bd3d828bc",
      organizer: userId,
    }).populate("organizer", ["username"]);

    res.status(200).json(conferenceDocs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/conference/registered", async (req, res) => {
  try {
    // const { userId } = req.params;
    const { userId } = req.body;
    console.log(userId);
    // const userId = "66083be6a678cb9bd3d828bc";

    const conferenceDocs = await Attendee.find({ userId: userId }).populate(
      "conferenceId"
    );

    // console.log(conferenceDocs);

    res.status(200).json(conferenceDocs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/get-jeo-data", (req, res) => {
  res.status(200).json({ name: "Jeo", age: "20", gender: "male" });
});

app.listen(4000);
