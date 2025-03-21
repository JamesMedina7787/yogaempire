// src/components/Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Card.css";

import Banner from "../assets/banner.jpg";
import AboutPic from "../assets/Gia-About.jpg";
import HomePic from "../assets/x2cr0w.png";
import ContactPic from "../assets/split.jpg";
import LoginPic from "../assets/x2plank.png";

const cards = [
  { image: AboutPic, title: "GIA", description: "OWNER and CEO.", destination: "/about/gia" },
  { image: HomePic, title: "JAMES", description: "Empowering fitness through discipline.", destination: "/about/james" },
  { image: ContactPic, title: "Let's Connect", description: "Reach out to the Yoga Empire team.", destination: "/Contact" },
  { image: LoginPic, title: "Return Home", description: "Back to where balance begins.", destination: "/" },
];

const Card = () => {
  const navigate = useNavigate();

  const handleCardClick = (destination) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => navigate(destination), 500); // Wait for scroll animation
  };

  return (
    <div className="card-container">
      {cards.map(({ image, title, description, destination }, index) => (
        <div
          key={index}
          className="card-wrapper"
          onClick={() => handleCardClick(destination)}
        >
          <div className="card-image-container">
            <img src={image} alt={title} className="card-image" />
          </div>
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
            <a href={destination} className="card-link">Explore →</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
export { cards };
