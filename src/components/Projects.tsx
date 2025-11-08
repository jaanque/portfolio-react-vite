// src/components/Projects.tsx
import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section">
      <h2 className="heading">Featured <span>Projects</span></h2>
      <div className="projects-container">
        <div className="project-card">
          <h3>Project One</h3>
          <p>Description of project one.</p>
        </div>
        <div className="project-card">
          <h3>Project Two</h3>
          <p>Description of project two.</p>
        </div>
        <div className="project-card">
          <h3>Project Three</h3>
          <p>Description of project three.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
