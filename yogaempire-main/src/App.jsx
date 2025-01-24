import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Card from "./components/Card";
import Home from "./components/Home";
import About from "./components/About";
//import Classes from "./components/Classes";
import Contact from "./components/Contact";
import James from "./components/James";
import Gia from "./components/Gia";

import Business from "./components/Business";
//import Zoom from "./components/zoom";
//import Workshops from "./components/workshops";
//import Login from "./components/login";
import Register from "./components/drafts/Register";
import HomePic from "./assets/x2cr0w.png";
import LoginPic from "./assets/x2plank.png";
import Bac2 from "./assets/x3crow.png";
import "./App.css";
import "./index.css";

function App() {
  const cards = [
    { image: HomePic, title: "The Future of Yoga", description: "Yoga Empire", destination: "/About" },

    { image: LoginPic, title: "Gia", description: "Ashtanga Vinyasa Flow", destination: "about/Gia" },
    { image: LoginPic, title: "James", description: "Fitness Professional", destination: "about/James" },
    { image: Bac2, title: "Our Life", description: "Business", destination: "about/Business" },
    { image: Bac2, title: "Email Us", description: "Contact-Form", destination: "/Contact" },
    { image: LoginPic, title: "Yoga Empire", description: "Home", destination: "/" }

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
          <Route path="/drafts/Register" element={<Register />} />
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
