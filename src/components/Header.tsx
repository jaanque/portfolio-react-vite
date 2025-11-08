// src/components/Header.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursor } from './Cursor';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { setHovered } = useCursor();

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const magneticElements = gsap.utils.toArray('.magnetic-effect', headerRef.current);

    magneticElements.forEach((el: HTMLElement) => {
      el.addEventListener('mouseenter', () => setHovered(true));
      el.addEventListener('mouseleave', () => {
        setHovered(false);
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });
      });

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
    });
  }, [setHovered]);

  return (
    <header className="header" ref={headerRef}>
      <a href="#home" className="logo magnetic-effect">MyPortfolio</a>
      <nav className="nav">
        <a href="#home" className="magnetic-effect">Home</a>
        <a href="#about" className="magnetic-effect">About</a>
        <a href="#projects" className="magnetic-effect">Projects</a>
        <a href="#contact" className="magnetic-effect">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
