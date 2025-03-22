import React, { useState, useEffect } from 'react';

const ZoomMeeting = () => {
  const [meetingData, setMeetingData] = useState({
    topic: '',
    start_time: '',
    duration: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem('token') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!authToken) return;
    fetch('http://localhost:3001/zoom/classes', {
      headers: { 'Authorization': `Bearer ${authToken}` },
    })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Error fetching classes:', err));
  }, [authToken]);

  const createZoomMeeting = async () => {
    if (!authToken) {
      setError('No auth token found. Please log in.');
      return;
    }

    if (!meetingData.topic || !meetingData.start_time || !meetingData.duration) {
      setError('Please fill in all fields before creating the meeting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/zoom/create-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Zoom meeting.');
      }

      const data = await response.json();
      setSuccessMessage(`Meeting Created! Join Link: ${data.join_url}`);
      setError('');
      setClasses([...classes, { ...meetingData, joinUrl: data.join_url }]);
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
      {!authToken && <div className="text-red-500 mb-2">No auth token found. Please log in.</div>}

      <input type="text" placeholder="Meeting Topic" value={meetingData.topic}
        onChange={(e) => setMeetingData({ ...meetingData, topic: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded" />

      <input type="datetime-local" placeholder="Start Time" value={meetingData.start_time}
        onChange={(e) => setMeetingData({ ...meetingData, start_time: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded" />

      <input type="number" placeholder="Duration (minutes)" value={meetingData.duration}
        onChange={(e) => setMeetingData({ ...meetingData, duration: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded" />

      <button onClick={createZoomMeeting} 
        className={`w-full text-white py-2 rounded-lg ${authToken ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`} 
        disabled={!authToken}>
        {authToken ? 'Create Meeting' : 'Login Required'}
      </button>

      <h3 className="text-xl font-bold mt-6">Upcoming Classes</h3>
      {classes.length > 0 ? (
        <ul>
          {classes.map((cls, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{cls.topic}</strong> - {new Date(cls.startTime).toLocaleString()}  
              <a href={cls.joinUrl} target="_blank" className="text-blue-600 ml-2">Join</a>
            </li>
          ))}
        </ul>
      ) : (
        <div>No upcoming classes.</div>
      )}
    </div>
  );
};

export default ZoomMeeting;