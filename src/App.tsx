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

      // Advanced staggered text reveals
      gsap.utils.toArray('.reveal-text').forEach((el: HTMLElement) => {
        const text = new SplitType(el, { types: 'chars, words' });
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
          opacity: 0,
          y: 20,
          stagger: 0.05,
        });
      });

      // Hero parallax effect
      gsap.to('.hero-content', {
        y: "-=50",
        scrollTrigger: {
          trigger: '.hero',
          scrub: true,
        },
      });
      gsap.to('.shape-1', {
        y: "-=100",
        scale: 1.2,
        scrollTrigger: {
          trigger: '.hero',
          scrub: true,
        },
      });
      gsap.to('.shape-2', {
        y: "-=80",
        scrollTrigger: {
          trigger: '.hero',
          scrub: true,
        },
      });
      gsap.to('.shape-3', {
        y: "-=120",
        scale: 0.8,
        scrollTrigger: {
          trigger: '.hero',
          scrub: true,
        },
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

      // Magnetic UI elements
      const magneticElements = gsap.utils.toArray('.magnetic-effect');
      magneticElements.forEach((el: HTMLElement) => {
        el.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);

          gsap.to(el, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          });
        });
      });

      // Canvas background animation
      const canvas = document.getElementById('canvas-background') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particles = [];
      const particleCount = 100;

      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;

        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.size > 0.1) this.size -= 0.01;
        }
        draw() {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function initParticles() {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }
      initParticles();

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            particles.push(new Particle());
          }
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticles();
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
      <canvas id="canvas-background"></canvas>
      <Header />
      <Hero />
      <Projects />
      <Socials />
    </div>
  );
}

export default App;
