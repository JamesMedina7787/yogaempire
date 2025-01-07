import React, { useState } from "react";

const Workshops = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const minimumStudents = 7; // Minimum number of students required
  const maximumStudents = 20; // Maximum number of students allowed

  const addStudent = (e) => {
    e.preventDefault();
    if (students.length < maximumStudents) {
      setStudents([...students, { name, email, notes }]);
      setName("");
      setEmail("");
      setNotes("");
    } else {
      alert("Applications are closed. The class is full!");
    }
  };

  const finalizeClass = () => {
    if (students.length >= minimumStudents && students.length <= maximumStudents) {
      alert(`Class finalized! Scheduled on ${date} at ${time} with ${students.length} students.`);
    } else {
      alert(`You need at least ${minimumStudents} students to start the class.`);
    }
  };

  return (
    <div className="digital-class-section">
      <h1>Workshops Signup</h1>
      <p>
        Join one of our workshops and grow your practice with the community!
        <br />
        <strong>Seats Available:</strong> {maximumStudents - students.length}/{maximumStudents}
      </p>

      {students.length < maximumStudents && (
        <form onSubmit={addStudent}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Notes:
            <input
              type="text"
              placeholder="Add notes or preferences (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      )}

      {students.length >= maximumStudents && (
        <p className="full-class">
          Applications are now closed. The class is full with {students.length} students!
        </p>
      )}

      <h2>Registered Students</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} ({student.email}) - {student.notes || "No notes"}
          </li>
        ))}
      </ul>

      {students.length >= minimumStudents && (
        <div>
          <h2>Finalize Class</h2>
          <p>
            Since the minimum requirement is met, you can finalize the date and time for
            the session:
          </p>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <button onClick={finalizeClass}>Finalize Date & Time</button>
        </div>
      )}

      {students.length < minimumStudents && (
        <p className="not-enough">
          We need at least {minimumStudents} students to start the class.
        </p>
      )}
    </div>
  );
};

export default Workshops;
