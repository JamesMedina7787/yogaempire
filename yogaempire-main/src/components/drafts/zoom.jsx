import React, { useState } from "react";
import axios from "axios";

const DigitalClass = () => {
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  const createMeeting = async () => {
    try {
      const response = await axios.post("http://localhost:3001/create-meeting", {
        topic,
        start_time: startTime,
        duration,
      });
      alert(`Meeting created! Join URL: ${response.data.join_url}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create meeting.");
    }
  };

  return (
    <div className="digital-class-section">
      <h2>Schedule a Digital Yoga Class</h2>
      <label>
        Class Topic:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </label>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>
      <label>
        Duration (minutes):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </label>
      <button onClick={createMeeting}>Create Meeting</button>
    </div>
  );
};

export default DigitalClass;
