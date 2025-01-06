
import ReactDOM from "react-dom";
import React, { useState } from "react";

import "./index.css"; // Optional, if you have styles

import Navbar from "./components/navbar"; // Ensure this import exists at the top

import Banner from './assets/banner.jpg'
import AboutPic from './assets/Gia-About.jfif'
import HomePic from './assets/x2cr0w.png'
import ContactPic from './assets/split.jpg'
import LoginPic from './assets/x2plank.png'
import BackX3 from './assets/stand.jpg'
import Bac2 from './assets/x3crow.png'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Card from './components/Card';
import Home from "./components/Home";
import About from "./components/About";
import Classes from "./components/Classes";
import Contact from "./components/Contact";
import James from "./components/James";
import Gia from "./components/Gia";
import Business from "./components/Business";
import Zoom from "./components/zoom";
import "./App.css"; // If you have a CSS file for styling


function App() {
  return (
    <Router>
      <header className="header">

	  	<div className="banner">
   
</div>
       

      </header>
      <main>
	  <Navbar className="navbar"/>
        <Routes className="nav-list">
          <Route path="/" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/About" element={<About />} />
          <Route path="/about/james" element={<James />} />
          <Route path="/about/gia" element={<Gia />} />
          <Route path="/about/business" element={<Business />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/zoom" element={<Zoom />} />
        </Routes>
	 <div>
      {/* Normal Section */}
      <section className="section">
        <h1 className="grand-text"></h1>
        <p></p>
      </section>

      {/* Parallax Section */}
      <div className="parallax">
        <div className="parallax-content">
          <h2>Gia : Experienced Yoga Instructor</h2>
          <p>Empire Yoga</p>
        </div>
      </div>

      {/* Another Normal Section */}
      <section className="section">
        <h1 className="header-content">Gia Rocks</h1>
       
      </section>
    </div>
		<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
			<Card
				image={HomePic}
				title="Gia"
				description="Gia is Hot!"
				destination="/"
			/>
		</div>
		 
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
			<Card
				image={LoginPic}
				title="Gia"
				description="Gia is Hot!"
				destination="/zoom"
			/>
		</div>
		 
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
			<Card
				image={Bac2}
				title="Gia"
				description="Gia is Hot!"
				destination="/contact"
			/>
		</div>
		
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
			<Card
				image={LoginPic}
				title="Gia"
				description="Gia is Hot!"
				destination="/zoom"
			/>
		</div>
    
       <p>whats going on here?</p>
      </main>
      <footer className="footer">
        <p>© 2024 Yoga Empire. All rights reserved.</p>
      </footer>
    </Router>
  );
}


export default App;