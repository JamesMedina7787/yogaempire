import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useAuth } from '../SignInSignUp/AuthContext';

const CalendarGrid = () => {
  const { user, token } = useAuth() || {};
  const [events, setEvents] = useState([]);

  const API_BASE_URL = 'http://localhost:3001'; // ✅ Ensures correct API calls

  // ✅ Fetch events when user logs in or changes
  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // ✅ Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      console.log('🔍 Events from backend:', response.data);

      setEvents(
        response.data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.startTime, // ✅ Matches backend fields
          end: event.endTime,
          color: event.color || 'gray',
        }))
      );
    } catch (error) {
      console.error('❌ Error fetching events:', error);
      setEvents([]);
    }
  };

  // ✅ Handles adding events as admin
  const handleDateClick = async (info) => {
    if (!user || user.role !== 'admin') {
      console.warn('⚠️ Unauthorized: Only admins can add events.');
      return;
    }

    const title = prompt('Enter Event Title');
    if (!title) return;

    const newEvent = {
      title,
      start: info.dateStr, // ✅ Matches backend field names
      end: info.dateStr,
      color: 'gray',
    };

    if (!token) {
      console.error('❌ No valid token found. Cannot add event.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/events`, newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('✅ Event successfully added:', response.data);

      setEvents(prevEvents => [
        ...prevEvents,
        {
          id: response.data.id,
          title: response.data.title,
          start: response.data.startTime,
          end: response.data.endTime,
          color: response.data.color || 'gray',
        },
      ]);

      fetchEvents(); // ✅ Ensures the event persists after refresh
    } catch (error) {
      console.error('❌ Error adding event:', error.response ? error.response.data : error);
    }
  };

  // ✅ Handles updating event dates when moved
  const handleEventDrop = async (info) => {
    if (!token) {
      console.error('❌ No valid token found. Cannot update event.');
      return;
    }

    const updatedEvent = {
      start: info.event.startStr, // ✅ Matches backend field names
      end: info.event.endStr,
    };

    try {
      await axios.put(`${API_BASE_URL}/events/${info.event.id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('✅ Event successfully updated:', updatedEvent);

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === info.event.id ? { ...event, ...updatedEvent } : event
        )
      );

      fetchEvents(); // ✅ Ensures consistency after update
    } catch (error) {
      console.error('❌ Error updating event:', error);
    }
  };

  // ✅ Handles deleting events
  const handleEventDelete = async (info) => {
    const id = info.event.id;
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    if (!token) {
      console.error('❌ No valid token found. Cannot delete event.');
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('✅ Event successfully deleted:', id);

      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));

      fetchEvents(); // ✅ Ensures event is removed from backend
    } catch (error) {
      console.error('❌ Error deleting event:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        editable={user?.role === 'admin'}
        eventDrop={handleEventDrop}
        eventClick={handleEventDelete}
      />
    </div>
  );
};

export default CalendarGrid;