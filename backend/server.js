// Import required modules
const express = require("express"); // Make sure to import express
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Zoom API credentials
const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;

// Zoom Meeting API
const createZoomMeeting = async (req, res) => {
  try {
    const meetingConfig = {
      topic: req.body.topic,
      type: 2, // Scheduled meeting
      start_time: req.body.start_time, // e.g., "2023-12-31T20:00:00Z"
      duration: req.body.duration, // in minutes
      timezone: "UTC",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
      },
    };

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingConfig,
      {
        headers: {
          Authorization: `Bearer ${ZOOM_API_KEY}:${ZOOM_API_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Zoom meeting" });
  }
};
app.post("/create-meeting", createZoomMeeting);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/workshops", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema and Model
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  notes: String,
});

const WorkshopSchema = new mongoose.Schema({
  students: [StudentSchema],
  date: String,
  time: String,
  capacity: { type: Number, default: 20 },
  minimumStudents: { type: Number, default: 7 },
});

const Workshop = mongoose.model("Workshop", WorkshopSchema);

// API Endpoints
app.post("/api/workshops", async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/workshops", async (req, res) => {
  try {
    const workshop = await Workshop.findOne();
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/workshops/students", async (req, res) => {
  try {
    const { name, email, notes } = req.body;
    const workshop = await Workshop.findOne();

    if (!workshop) return res.status(404).json({ error: "Workshop not found" });

    if (workshop.students.length >= workshop.capacity) {
      return res.status(400).json({ error: "The class is full!" });
    }

    workshop.students.push({ name, email, notes });
    await workshop.save();

    res.status(201).json(workshop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/workshops/finalize", async (req, res) => {
  try {
    const { date, time } = req.body;
    const workshop = await Workshop.findOne();

    if (!workshop) return res.status(404).json({ error: "Workshop not found" });

    if (workshop.students.length < workshop.minimumStudents) {
      return res.status(400).json({ error: "Not enough students to finalize the class" });
    }

    workshop.date = date;
    workshop.time = time;
    await workshop.save();

    res.status(200).json(workshop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
