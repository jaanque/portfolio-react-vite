// src/components/Cursor.tsx
import React, { createContext, useContext, useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const CursorContext = createContext({
  setHovered: (hovered: boolean) => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const cursorRef = useRef(null);

  useLayoutEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.7,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useLayoutEffect(() => {
    gsap.to(cursorRef.current, {
      scale: hovered ? 2 : 1,
      duration: 0.3,
      ease: 'power3.out',
    });
  }, [hovered]);

  return (
    <CursorContext.Provider value={{ setHovered }}>
      <div className="cursor" ref={cursorRef}></div>
      {children}
    </CursorContext.Provider>
  );
};
