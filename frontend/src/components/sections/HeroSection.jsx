import React from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { personalInfo } from '../../data/mock';
import './HeroSection.css';
import heroimg from '../assests/1000197111.jpg'

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-text">
            {personalInfo.available && (
              <div className="status-badge">
                <span className="status-dot"></span>
                AVAILABLE FOR WORK
              </div>
            )}
            <h1 className="hero-name">{personalInfo.name}</h1>
            <h2 className="hero-tagline">{personalInfo.tagline}</h2>
            <p className="hero-bio">{personalInfo.bio}</p>
            <br></br>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={scrollToProjects}>
                VIEW PROJECTS
              </button>
              <a href={personalInfo.resumeLink} className="cta-button secondary" download>
                <Download size={18} />
                RESUME
              </a>
              <a href={`mailto:${personalInfo.email}`} className="cta-button tertiary">
                <Mail size={18} />
                CONTACT
              </a>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image-container">
            <img src={heroimg} alt={personalInfo.name} className="hero-image" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToProjects}>
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown className="bounce" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;