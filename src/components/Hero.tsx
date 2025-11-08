// src/components/Hero.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const heroTitle = new SplitType('.hero-content h1', { types: 'chars' });
    gsap.from(heroTitle.chars, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.05,
      ease: 'power3.out',
      delay: 2.5,
    });

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
  }, []);

  return (
    <section id="home" className="section hero" ref={heroRef}>
      <div className="hero-bg-shape shape-1"></div>
      <div className="hero-bg-shape shape-2"></div>
      <div className="hero-content">
        <h1 className="reveal-text">Stunning Web Experiences</h1>
        <p className="subtitle">React & GSAP Specialist</p>
      </div>
      <div className="hero-bg-shape shape-3"></div>
    </section>
  );
};

export default Hero;
