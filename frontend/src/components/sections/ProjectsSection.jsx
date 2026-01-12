import React, { useState } from 'react';
import { Github, ExternalLink, BookOpen, Filter } from 'lucide-react';
import { projects } from '../../data/mock';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI/ML', 'Web', 'Research'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const colorMap = {
    orange: '#FF6B35',
    blue: '#5B9FFF',
    pink: '#FF84E4',
    purple: '#D987FF',
    green: '#78D692',
    white: '#FFFFFF'
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">FEATURED PROJECTS</h2>
        <p className="section-subtitle">Building the future, one project at a time</p>
      </div>

      {/* Filter Buttons */}
      <div className="filter-container">
        <Filter size={20} />
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            style={{ backgroundColor: colorMap[project.color] }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={24} />
                    </a>
                  )}
                  {project.colab && (
                    <a href={project.colab} target="_blank" rel="noopener noreferrer" className="project-link">
                      <BookOpen size={24} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-category">{project.category}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag-badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;