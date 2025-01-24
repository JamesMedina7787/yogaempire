import React from "react";

const Classes = () => {
  const classes = [
    { name: "Vinyasa Flow", time: "8:00 AM" },
    { name: "Yin Yoga", time: "10:00 AM" },
    { name: "Power Yoga", time: "6:00 PM" },
  ];

  return (
    <section className="booking-section">
      <h1>Book a Private Session</h1>
      <p>
        Choose a date and let us know your preferred time or any special requests. We’ll get back to you to confirm your session.
      </p>

      <form id="booking-form" action="your-server-endpoint" method="POST">
        <label htmlFor="session-date">Select a Date:</label>
        <input type="date" id="session-date" name="session-date" required />

        <label htmlFor="suggestion">Your Request/Preference:</label>
        <textarea
          id="suggestion"
          name="suggestion"
          rows="4"
          placeholder="Let us know your preferred time or any specific needs for your session."
          required
        ></textarea>

        {/* Add a Submit Button Here */}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Classes;
