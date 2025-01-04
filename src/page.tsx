import Image from "next/image";

export default function About() {
  return (
    <div className="body">
      {/* Header */}
      <header>
        <nav >
          <a href="/">Home</a>
          <a href="/Classes">Classes</a>
          <a href="/About">About</a>
          <a href="/Contact">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        <h1>About Yoga Empire</h1>
        <p>
          At Yoga Empire, we believe in the transformative power of Yoga. Our
          mission is to inspire and empower individuals of all levels to
          connect with their bodies, minds, and souls through a dynamic and
          inclusive yoga practice.
        </p>
        <p>
          Founded by Gia, a 500-hour certified Yoga Instructor with a passion
          for movement and mindfulness, Yoga Empire serves as a space to
          rejuvenate, grow, and challenge yourself. Whether you're a beginner
          exploring yoga for the first time or an advanced yogi deepening your
          practice, we provide a supportive environment to help you thrive.
        </p>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Yoga Empire. All rights reserved.</p>
      </footer>
    </div>
  );
}
