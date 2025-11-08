import { useLayoutEffect, useRef } from 'react';
import './App.css';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Socials from './components/Socials';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
        delay: 2.5, // Adjusted delay
      });

      // Socials animation
      gsap.from('.socials a', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 3,
      });

      // Horizontal scroll for projects
      const projects = gsap.utils.toArray('.project-card');
      const projectsContainer = document.querySelector('.projects-container');

      gsap.to(projectsContainer, {
        x: () => -(projectsContainer.scrollWidth - window.innerWidth + 40), // 40 for padding
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-container-wrapper',
          start: 'center center',
          end: () => `+=${projectsContainer.scrollWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Project card image reveal
      const imageReveal = document.querySelector('.project-image-reveal');
      projects.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(imageReveal, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power3.out',
            backgroundImage: `url(${card.dataset.image})`,
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(imageReveal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power3.out',
          });
        });
        card.addEventListener('mousemove', (e) => {
          gsap.to(imageReveal, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power3.out',
          });
        });
      });
    }, comp);

    return () => {
        ctx.revert();
        // It's good practice to destroy the Lenis instance on cleanup
        lenis.destroy();
    }
  }, []);

  return (
    <div className="portfolio" ref={comp}>
      <div className="preloader">
        <div className="bar"></div>
      </div>
      <div className="cursor"></div>
      <div className="project-image-reveal"></div>
      <Header />
      <Hero />
      <Projects />
      <Socials />
    </div>
  );
}

export default App;
