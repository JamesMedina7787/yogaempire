import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/drafts/SignInSignUp/AuthContext";
import Navbar from "./components/navbar";
import Card from "./components/Card";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import James from "./components/James";
import Gia from "./components/Gia";
import Business from "./components/Business";
//import CalendarGrid from "./components/drafts/Calendar/CalendarGrid.jsx";
//import MediaUploader from "./components/drafts/Media/MediaUploader.jsx";
//import ShapeDesigner from "./components/drafts/Design/ShapeDesigner.jsx";
//import Register from "./components/drafts/SignInSignUp/Register.jsx";
//import LoginSection from "./components/drafts/SignInSignUp/LoginSection.jsx";
//import AdminPanel from "./components/drafts/AdminPanel.jsx";
//import Zoom from "./components/drafts/Zoom/Zoom.jsx";
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
    <AuthProvider>
      <Router>
        <header className="header">
          <div className="banner"></div>
        </header>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/about/james" element={<James />} />
            <Route path="/about/gia" element={<Gia />} />
            <Route path="/about/business" element={<Business />} />
            <Route path="/Contact" element={<Contact />} />
            {/* <Route path="/drafts/Zoom/Zoom" element={<Zoom />} /> */}
{/* 
           <Route path="/drafts/SignInSignUp/Register" element={<Register />} />
            <Route path="/drafts/SignInSignUp/LoginSection" element={<LoginSection />} />
            <Route path="/drafts/Design/ShapeDesigner" element={<ShapeDesigner />} />
            <Route path="/drafts/Media/MediaUploader" element={<MediaUploader />} />
            <Route path="/drafts/Calendar/CalendarGrid" element={<CalendarGrid />} />
            <Route path="/drafts/AdminPanel" element={<AdminPanel />} /> */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", fontSize: "1.5rem", padding: "2rem" }}>
                  <p>Page Not Found</p>
                </div>
              }
            />
          </Routes>
          <Card cards={cards} />

        </main>
        <footer className="footer">
          <strong>© 2024 Yoga Empire. All rights reserved.</strong>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
