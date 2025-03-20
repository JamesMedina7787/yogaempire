import React, { useState } from 'react';

const ZoomMeeting = () => {
  const [meetingData, setMeetingData] = useState({
    topic: '',
    start_time: '',
    duration: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const createZoomMeeting = async () => {
    // Basic validation
    if (!meetingData.topic || !meetingData.start_time || !meetingData.duration) {
      setError('Please fill in all fields before creating the meeting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/zoom/create-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Zoom meeting.');
      }

      const data = await response.json();
      setSuccessMessage(`Zoom Meeting Created Successfully! Link: ${data.join_url}`);
      setError('');
    } catch (err) {
      console.error('Error creating Zoom meeting:', err);
      setError(err.message);
    }
  };

  return (
    <div className="zoom-meeting p-4 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a Zoom Meeting</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}

      <input
        type="text"
        placeholder="Meeting Topic"
        value={meetingData.topic}
        onChange={(e) => setMeetingData({ ...meetingData, topic: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="datetime-local"
        placeholder="Start Time"
        value={meetingData.start_time}
        onChange={(e) => setMeetingData({ ...meetingData, start_time: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={meetingData.duration}
        onChange={(e) => setMeetingData({ ...meetingData, duration: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <button
        onClick={createZoomMeeting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Create Meeting
      </button>
    </div>
  );
};

export default ZoomMeeting;
