// src/components/Projects.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { Canvas } from '@react-three/fiber';
import ProjectImage from './ProjectImage';

const projectsData = [
  {
    title: 'Project One',
    description: 'A cutting-edge web application built with React and GSAP.',
    image: 'https://via.placeholder.com/400x300.png/000/fff?text=Project+1',
  },
  {
    title: 'Project Two',
    description: 'An interactive data visualization dashboard.',
    image: 'https://via.placeholder.com/400x300.png/111/fff?text=Project+2',
  },
  {
    title: 'Project Three',
    description: 'A sleek and modern e-commerce platform.',
    image: 'https://via.placeholder.com/400x300.png/222/fff?text=Project+3',
  },
  {
    title: 'Project Four',
    description: 'A creative and engaging marketing website.',
    image: 'https://via.placeholder.com/400x300.png/333/fff?text=Project+4',
  },
];

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!projectsRef.current) return;

    const projectsContainer = document.querySelector('.projects-container');

    gsap.to(projectsContainer, {
      x: () => -(projectsContainer.scrollWidth - window.innerWidth + 40),
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

    const cards = gsap.utils.toArray('.project-card', projectsRef.current);
    cards.forEach((card: HTMLElement) => {
      new SplitType(card.querySelectorAll('.reveal-text'), { types: 'chars, words' });
      gsap.from(card.querySelectorAll('.reveal-text .char'), {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 60%',
          scrub: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.05,
      });
    });
  }, []);

  return (
    <section id="projects" className="section" ref={projectsRef}>
      <h2 className="heading reveal-text">Featured <span>Projects</span></h2>
      <div className="projects-container-wrapper">
        <div className="projects-container">
          {projectsData.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-card-image">
                <Canvas>
                  <ProjectImage imageUrl={project.image} />
                </Canvas>
              </div>
              <h3 className="reveal-text">{project.title}</h3>
              <p className="reveal-text">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
