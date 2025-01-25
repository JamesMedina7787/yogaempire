import React, { useState } from 'react';

const ZoomMeeting = () => {
  const [meetingData, setMeetingData] = useState({
    topic: '',
    start_time: '',
    duration: '',
  });

  const createZoomMeeting = async () => {
    try {
      const response = await fetch('http://localhost:3001/zoom/create-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingData),
      });
      const data = await response.json();
      alert(`Zoom Meeting Created: ${data.join_url}`);
    } catch (err) {
      console.error('Error creating Zoom meeting:', err);
    }
  };

  return (
    <div className="zoom-meeting">
      <h2 className="text-xl font-semibold mb-4">Create a Zoom Meeting</h2>
      <input type="text" placeholder="Topic" value={meetingData.topic} onChange={(e) => setMeetingData({ ...meetingData, topic: e.target.value })} />
      <input type="datetime-local" placeholder="Start Time" value={meetingData.start_time} onChange={(e) => setMeetingData({ ...meetingData, start_time: e.target.value })} />
      <button onClick={createZoomMeeting} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Meeting</button>
    </div>
  );
};

export default ZoomMeeting;
