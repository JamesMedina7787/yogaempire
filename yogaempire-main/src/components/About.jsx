import React from "react";
import "../About.css";
import Gia from '../assets/Gia-About.jpg'
const About = () => {
  return (
	<section className="about-container">
	{/* Hero Section */}
	<div className="about-hero">
	<p style={{display:'none'}} ><h1>Gia</h1>
          My name is Gia, and I’m a 500-hour Yoga Alliance-certified instructor with a
          passion for creating inclusive and engaging yoga experiences. I specialize in
          open-level Vinyasa flow classes, designed to support yogis of all levels, from
          beginners to advanced practitioners.
      
          My teaching style is intuitive, meaning no two classes are ever the same. I
          love to read the energy of the room and adapt each session to meet the needs
          of my students. Whether it’s incorporating creative sequences, exploring new
          poses, or adjusting the pace, I aim to make every class a unique and rewarding
          experience.
       
          I also believe yoga is a collaborative journey. I encourage my students to be
          involved, whether that means asking questions, sharing their goals, or working
          together to explore their practice more deeply. My classes are not just about
          movement—they’re about connection, growth, and having fun along the way.
    
          Let’s work together to create a yoga practice that feels authentic, joyful,
          and empowering. I’m excited to connect with you and be a part of your yoga
          journey!
        </p>
	</div>
  
	{/* About Image */}
	<div className="about-image">
	  <img src={Gia} alt="Gia" />
	</div>
  
	{/* Values Section */}
	<div className="about-values">
	  <h3>Our Values</h3>
	  <ul>
		<li>
		  <strong>Inclusivity:</strong> Everyone is welcome, regardless of age, ability, or experience.
		</li>
		<li>
		  <strong>Community:</strong> We create a space where students connect, grow, and support one another.
		</li>
		<li>
		  <strong>Mindfulness:</strong> Our classes go beyond physical poses, incorporating breathwork and meditation.
		</li>
		<li>
		  <strong>Quality:</strong> Every instructor brings expertise and passion to each session.
		</li>
	  </ul>
	</div>
  </section>
  
  );
};
export default About;
