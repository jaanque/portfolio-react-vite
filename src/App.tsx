import { useLayoutEffect } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    gsap.from('.header', {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'power3.out',
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    });
  }, []);

  return (
    <div className="portfolio">
      <header className="header">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home" className="section">
          <h1>Welcome to my Portfolio</h1>
          <p>This is the home section.</p>
        </section>
        <section id="about" className="section">
          <h2>About Me</h2>
          <p>This is the about section.</p>
        </section>
        <section id="projects" className="section">
          <h2>My Projects</h2>
          <p>This is the projects section.</p>
        </section>
        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <p>This is the contact section.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
