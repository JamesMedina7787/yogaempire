import React from "react";

const Classes = () => {
  const classes = [
    { name: "Vinyasa Flow", time: "8:00 AM" },
    { name: "Yin Yoga", time: "10:00 AM" },
    { name: "Power Yoga", time: "6:00 PM" },
  ];

  return (
    <section>
      <h2>Our Classes</h2>
      <ul>
        {classes.map((yogaClass, index) => (
          <li key={index}>
            <h3>{yogaClass.name}</h3>
            <p>{yogaClass.time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Classes;
