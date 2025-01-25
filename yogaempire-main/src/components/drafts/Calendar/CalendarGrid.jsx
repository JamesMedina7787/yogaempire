import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For drag-and-drop


const CalendarGrid = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Yoga Class', start: '2025-02-01', color: 'blue' },
    { id: 2, title: 'Meditation Workshop', start: '2025-02-05', color: 'green' },
    { id: 3, title: 'Zoom Meeting', start: '2025-02-10', color: 'yellow' },
  ]);

  // Handle adding events when a date is clicked
  const handleDateClick = (info) => {
    const title = prompt('Enter Event Title');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start: info.dateStr,
        color: 'gray',
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  // Handle dragging and updating event dates
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === parseInt(info.event.id)
        ? { ...event, start: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          ...event,
          backgroundColor: event.color, // Add color styling
        }))}
        dateClick={handleDateClick} // Add event on date click
        editable={true} // Enable drag-and-drop
        eventDrop={handleEventDrop} // Update events on drag-and-drop
      />
    </div>
  );
};

export default CalendarGrid;
