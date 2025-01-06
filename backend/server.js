const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;

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

const PORT = process.env.PORTT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
