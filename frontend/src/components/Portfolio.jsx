import React, { useEffect, useState } from 'react';
import HeroSection from './sections/HeroSection';
import ActivitySection from './sections/ActivitySection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ResearchSection from './sections/ResearchSection';
import ContactSection from './sections/ContactSection';
import Navigation from './Navigation';
import './Portfolio.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'activity', 'projects', 'skills', 'experience', 'education', 'research', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <ActivitySection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ResearchSection />
      <ContactSection />
    </div>
  );
};

export default Portfolio;