// Import required modules
const express = require("express"); // Make sure to import express
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

// Import route files
const authRoutes = require("./routes/auth"); 
const classRoutes = require("./routes/classes");
const workshopRoutes = require("./routes/workshops"); // Add workshops route

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
app.post("/api/create-meeting", createZoomMeeting); // Prefix this with "/api"

// MongoDB Connection


mongoose
  .connect("mongodb://127.0.0.1:27017/workshops", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api", authRoutes); // All authentication routes are prefixed with "/auth"
app.use("/workshops", workshopRoutes); // All workshop-related routes are prefixed with "/workshops"
app.use("/classes", classRoutes); // All class-related routes are prefixed with "/classes"

// Start the server
const HUH = process.env.PORTT||3001;
app.listen(HUH, () => console.log(`Server running on port ${HUH}`));
