import React from "react";
import "../About.css";
import Gia from '../assets/Gia-About.jfif'
const About = () => {
  return (
	<section className="about-container">
	{/* Hero Section */}
	<div className="about-hero">
	  <h2>About Yoga Empire</h2>
	  <p>
		At Yoga Empire, we believe in the transformative power of yoga. Our mission is to
		inspire and empower individuals of all levels to connect with their bodies, minds,
		and souls through a dynamic and inclusive yoga practice.
	  </p>
	  <p>
		Founded by Gia, a 500-hour certified Yoga Instructor with a passion for movement
		and mindfulness, Yoga Empire serves as a space to rejuvenate, grow, and challenge
		yourself. Whether you’re a beginner exploring yoga for the first time or an advanced
		yogi deepening your practice, we provide a supportive environment to help you thrive.
	  </p>
	  <p>
		I've always been fascinated with the art of body and movement that's motivated me,
		in one shape or form, to be active my entire life. When I took my first yoga class,
		I realized an immediate connection. After training 5 to 6 days a week in many styles
		of yoga (Hatha, Ashtanga, etc.), my love for yoga was solidified when I decided I
		wanted to teach. Educated by the best yoga teachers in NYC, I am certified in Vinyasa
		Flow Yoga, which means the flow of postures linked by the breath. 
	  </p>
	  <p>
		I have worked with yogis of all levels throughout NYC, Westchester County, Long Island,
		and Upstate NY. I have an immense appreciation for yoga, and sharing it is my passion. 
		So whether you want to begin or continue, elevate your fitness level, both mind and body, 
		by incorporating yoga in your daily routine. It's always an amazing time—come flow with Gia, 
		and we'll journey together.
	  </p>
	  <p>
		Join us for a variety of yoga classes, workshops, and personalized training sessions 
		that elevate your fitness journey. Together, we'll embark on a path of self-discovery, 
		balance, and harmony. It’s more than a practice—it’s a lifestyle.
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
