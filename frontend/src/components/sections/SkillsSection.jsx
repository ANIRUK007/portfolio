import React from 'react';
import { Code, Layers, Wrench, Terminal, Lightbulb } from 'lucide-react';
import { skills } from '../../data/mock';
import './SkillsSection.css';

const SkillsSection = () => {
  const skillCategories = [
    { title: 'LANGUAGES', items: skills.languages, icon: <Code size={28} />, color: '#FF6B35' },
    { title: 'FRAMEWORKS', items: skills.frameworks, icon: <Layers size={28} />, color: '#5B9FFF' },
    { title: 'LIBRARIES', items: skills.libraries, icon: <Wrench size={28} />, color: '#FF84E4' },
    { title: 'TOOLS', items: skills.tools, icon: <Terminal size={28} />, color: '#78D692' },
    { title: 'RESEARCH INTERESTS', items: skills.research, icon: <Lightbulb size={28} />, color: '#D987FF' },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">SKILLS & EXPERTISE</h2>
        <p className="section-subtitle">Technologies and areas I work with</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <div 
            key={idx} 
            className="skill-category"
            style={{ backgroundColor: category.color }}
          >
            <div className="category-header">
              {category.icon}
              <h3 className="category-title">{category.title}</h3>
            </div>
            <div className="skills-list">
              {category.items.map((skill, skillIdx) => (
                <span key={skillIdx} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;