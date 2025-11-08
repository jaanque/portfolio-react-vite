import { useLayoutEffect, useRef } from 'react';
import './App.css';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSmoothScroll from './hooks/useSmoothScroll';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Socials from './components/Socials';
import Scene from './components/Scene';
import { CursorProvider } from './components/Cursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useSmoothScroll();
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
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <CursorProvider>
      <div className="portfolio" ref={comp}>
        <div className="preloader">
          <div className="bar"></div>
        </div>
        <div className="webgl-scene">
          <Scene />
        </div>
        <Header />
        <Hero />
        <Projects />
        <Socials />
      </div>
    </CursorProvider>
  );
}

export default App;
