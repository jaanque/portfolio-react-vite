// src/components/Projects.tsx
import React from 'react';

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
  return (
    <section id="projects" className="section">
      <h2 className="heading">Featured <span>Projects</span></h2>
      <div className="projects-container-wrapper">
        <div className="projects-container">
          {projectsData.map((project, index) => (
            <div className="project-card" key={index} data-image={project.image}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
