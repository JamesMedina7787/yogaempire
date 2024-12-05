import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4">
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Pure Heart Yoga</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="text-center mt-16 max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-purple-600">
          We Are Bringing a New Standard to Hot Yoga
        </h1>
        <p className="text-gray-700 mt-4">
          Pure Heart Yoga offers state-of-the-art facilities and the ultimate Hot Yoga experience.
        </p>
        <div className="mt-8">
          <Image
            src="/yoga-hero.jpg" // Replace with a relevant yoga image
            alt="Yoga practice"
            width={500}
            height={300}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        <div className="mt-8">
          <a
            href="#learn-more"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Who Are We?</h2>
          <p className="text-lg text-gray-700 text-center">
            We are a Hot Yoga Facility located in Bedford Hills, New York, bringing age-old yoga traditions to modern facilities. With over ten years of experience, we are committed to your wellness journey.
          </p>
        </div>
      </section>

      {/* Creative Classes Section */}
      <section id="services" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Creative and Uninhibited Yoga Classes
          </h2>
          <p className="text-lg text-gray-700 text-center">
            At Pure Heart Yoga, we teach creatively and adaptively. No two classes are ever the same. Every session is designed to bring you the best of flexibility, mindfulness, and balance.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-purple-600 text-white py-6 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <p>&copy; 2024 Pure Heart Yoga. All rights reserved.</p>
          <nav className="flex justify-center space-x-4 mt-4">
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
