// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
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
