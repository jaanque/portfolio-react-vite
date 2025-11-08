import { useLayoutEffect } from 'react';
import './App.css';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useLayoutEffect(() => {
    // Header animation
    gsap.from('.header', {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Hero section timeline
    const heroTl = gsap.timeline({ delay: 0.8 });
    heroTl
      .from('.hero-content h1', { duration: 0.8, x: -50, opacity: 0, ease: 'power3.out' })
      .from('.hero-content h3', { duration: 0.8, x: -50, opacity: 0, ease: 'power3.out' }, '-=0.5')
      .from('.hero-content p', { duration: 0.8, x: -50, opacity: 0, ease: 'power3.out' }, '-=0.5')
      .from('.btn', { duration: 0.8, opacity: 0, y: 50, ease: 'power3.out' }, '-=0.5');

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.section').forEach((section, i) => {
      if (i > 0) { // Skip the hero section
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      }
    });

    // Staggered animation for project cards
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-container',
            start: 'top 80%',
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.3,
        ease: 'power3.out',
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: targetId, offsetY: 70 },
                ease: 'power2.inOut'
            });
        });
    });

  }, []);

  return (
    <div className="portfolio">
      <header className="header">
        <a href="#home" className="logo">MyPortfolio</a>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home" className="section">
        <div className="hero-content">
          <h1>Hi, I'm a Web Developer</h1>
          <h3>Specializing in React & GSAP</h3>
          <p>I create stunning and interactive web experiences. Let's build something amazing together.</p>
          <a href="#projects" className="btn">View My Work</a>
        </div>
      </section>

      <section id="about" className="section">
        <h2 className="heading">About <span>Me</span></h2>
        <div className="about-content">
          <div className="about-img">
            <img src="https://via.placeholder.com/250" alt="About Me" />
          </div>
          <div className="about-text">
            <p>I'm a passionate web developer with a love for creating beautiful and functional websites. I have experience with a variety of technologies, including React, TypeScript, and GSAP. I'm always eager to learn new things and take on new challenges.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="heading">My <span>Projects</span></h2>
        <div className="projects-container">
          <div className="project-card">
            <h3>Project One</h3>
            <p>A brief description of the first project. Highlighting the technologies used and the problems solved.</p>
          </div>
          <div className="project-card">
            <h3>Project Two</h3>
            <p>A brief description of the second project. Highlighting the technologies used and the problems solved.</p>
          </div>
          <div className="project-card">
            <h3>Project Three</h3>
            <p>A brief description of the third project. Highlighting the technologies used and the problems solved.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2 className="heading">Contact <span>Me</span></h2>
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
