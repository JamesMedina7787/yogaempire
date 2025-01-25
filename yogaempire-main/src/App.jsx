import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Card from "./components/Card.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import James from "./components/James.jsx";
import Gia from "./components/Gia.jsx";
import Business from "./components/Business.jsx";
import AnimationPicker from "./components/drafts/Design/AnimationPicker.jsx";
import ShapeDesigner from "./components/drafts/Design/ShapeDesigner.jsx";
import Register from "./components/drafts/SignInSignUp/Register.jsx";
import SocialContainer from "./components/drafts/Social/SocialContainer.jsx";
import Instagram from "./components/drafts/Social/Instagram.jsx";
import LoginSection from "./components/drafts/SignInSignUp/LoginSection.jsx";
import CalendarGrid from "./components/drafts/Calendar/CalendarGrid.jsx";
import CalendarTile from "./components/drafts/Calendar/CalendarTile.jsx";
import AdminPanel from "./components/drafts/AdminPanel.jsx";
import HomePic from "./assets/x2cr0w.png";
import LoginPic from "./assets/x2plank.png";
import Bac2 from "./assets/x3crow.png";
import "./App.css";
import "./index.css";

function App() {
  const cards = [
    { image: HomePic, title: "The Future of Yoga", description: "Yoga Empire", destination: "/About" },
    { image: LoginPic, title: "Gia", description: "Ashtanga Vinyasa Flow", destination: "/about/gia" },
    { image: LoginPic, title: "James", description: "Fitness Professional", destination: "/about/james" },
    { image: Bac2, title: "Our Life", description: "Business", destination: "/about/business" },
    { image: Bac2, title: "Email Us", description: "Contact-Form", destination: "/Contact" },
    { image: LoginPic, title: "Yoga Empire", description: "Home", destination: "/" },
  ];

  return (
    <Router>
      <header className="header">
        <div className="banner"></div>
      </header>
      <main>
        <Navbar className="navbar" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/about/james" element={<James />} />
          <Route path="/about/gia" element={<Gia />} />
          <Route path="/about/business" element={<Business />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/drafts/SignInSignUp/Register" element={<Register />} />
          <Route path="/drafts/Calendar/CalendarGrid" element={<CalendarGrid />} />
          <Route path="/drafts/Calendar/CalendarTile" element={<CalendarTile />} />
          <Route path="/drafts/Design/ShapeDesigner" element={<ShapeDesigner />} />
          <Route path="/drafts/Design/AnimationPicker" element={<AnimationPicker />} />
          <Route path="/drafts/SignInSignUp/LoginSection" element={<LoginSection />} />
          <Route path="/drafts/AdminPanel" element={<AdminPanel />} />
          <Route path="/drafts/Social/Instagram" element={<Instagram />} />
          <Route path="/drafts/Social/SocialContainer" element={<SocialContainer />} />
          
        </Routes>
        <div className="centered-flex">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              destination={card.destination}
            />
          ))}
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 Yoga Empire. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
