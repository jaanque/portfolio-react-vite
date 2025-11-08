import { useLayoutEffect, useRef } from 'react';
import './App.css';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplitType from 'split-type';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Preloader animation
      const preloaderTl = gsap.timeline();
      preloaderTl
        .to('.preloader .bar', {
          width: '100%',
          duration: 2,
          ease: 'power3.inOut',
        })
        .to('.preloader', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            document.querySelector('.preloader').style.display = 'none';
          },
        });

      // Custom cursor
      const cursor = document.querySelector('.cursor');
      window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX - cursor.offsetWidth / 2,
          y: e.clientY - cursor.offsetHeight / 2,
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Header scroll animation
      gsap.to('.header', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          toggleClass: {
            targets: '.header',
            className: 'scrolled'
          },
          scrub: true,
        },
      });

      // Hero text animation
      const heroTitle = new SplitType('.hero-content h1', { types: 'chars' });
      gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 3,
      });

      // Project cards animation
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-container',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio" ref={comp}>
      <div className="preloader">
        <div className="bar"></div>
      </div>
      <div className="cursor"></div>
      <Header />
      <Hero />
      <Projects />
    </div>
  );
}

export default App;
