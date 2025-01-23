import React from "react";
import "../About.css";
import Gia from "../assets/Gia-About.jpg";

const About = () => {
  return (
    <section className="about-container">
      <div className="about-hero">
        <h1>Gia</h1>
        <p>
          My name is Gia, and I’m a 500-hour Yoga Alliance-certified instructor with a passion for creating inclusive and engaging yoga experiences.
          I specialize in open-level Vinyasa flow classes, designed to support yogis of all levels, from beginners to advanced practitioners.
        </p>
      </div>

      <div className="about-image">
        <img
          src={Gia}
          alt="Portrait of Gia"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.jpg"; 
          }}
        />
      </div>
    </section>
  );
};

export default About;
