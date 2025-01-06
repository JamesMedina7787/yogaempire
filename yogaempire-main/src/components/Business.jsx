



import React from 'react';


const Business = () => {
  return (
<div className="business-page">
  {/* About Section */}
  <section className="about-section">
    <h2 className="ufoLoad from-top">
      <span style={{ fontSize: '2rem', color: '#FF7E79' }}>&#x0950;</span>
    </h2>
    <p className="ufoLoad from-left">
      At Yoga Empire, we believe yoga is more than just stretching—it's an evolving practice of intelligent movement that resonates deeply with the complexities of life.
      Rather than breaking ourselves down to rebuild, we embrace a perpetual journey of self-discovery and growth, creating a path that moves ever upward beyond the body.
    </p>
    <p className="ufoLoad from-right">
      Our practice transcends the physical, guiding you toward balance, strength, and clarity. With inspiring teachers and an inclusive approach, we honor yoga’s timeless tradition while adapting it to support every individual’s unique journey. Together, we continue to evolve and thrive in a space built for connection, healing, and transformation.
    </p>
    <button className="ufoLoad from-bottom">Join a Class</button>
  </section>

  {/* Welcome Section */}
  <section className="welcome-section">
    <h1>
      Welcome to Yoga Empire{' '}
      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s-4-2.5-8-9c0 4.5 3 7 8 7s8-2.5 8-7c-4 6.5-8 9-8 9z"></path>
          <path d="M12 22s-2-2-2-6 2-8 2-8 2 6 2 8-2 6-2 6z"></path>
          <path d="M10 4s-2-1-2-4"></path>
          <path d="M14 4s2-1 2-4"></path>
          <path d="M6.5 7s-2-.5-4-3"></path>
          <path d="M17.5 7s2-.5 4-3"></path>
        </svg>
      </span>
    </h1>
  </section>
</div>

  );
};

export default Business;