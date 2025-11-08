// src/components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="section hero">
      <div className="hero-bg-shape shape-1"></div>
      <div className="hero-bg-shape shape-2"></div>
      <div className="hero-content">
        <h1>Stunning Web Experiences</h1>
        <p className="subtitle">React & GSAP Specialist</p>
      </div>
      <div className="hero-bg-shape shape-3"></div>
    </section>
  );
};

export default Hero;
