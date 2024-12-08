import React from "react";
import ReactDOM from "react-dom";

import "./index.css"; // Optional, if you have styles

import Banner from './assets/banner.jpg'
import AboutPic from './assets/aboutPic.png'
import HomePic from './assets/x2cr0w.png'
import ContactPic from './assets/warr2.png'
import LoginPic from './assets/x2plank.png'
import BackX3 from './assets/backX3.png'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Card from './components/Card';
import Home from "./components/Home";
import About from "./components/About";
import Classes from "./components/Classes";
import Contact from "./components/Contact";
import "./App.css"; // If you have a CSS file for styling


function App() {
  return (
    <Router>
      <header className="header">
	  <img src={Banner} alt="Yoga Empire Banner" style={{ width: '100%', height: 'auto' }}/>

	  	<div className="banner">
   
</div>
       
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Classes">Classes</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
	
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
				image={AboutPic}
				title="Gia"
				description="Gia is Hot!"
				destination="/about"
			/>
		</div>
		
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
			<Card
				image={ContactPic}
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
				destination="/login"
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