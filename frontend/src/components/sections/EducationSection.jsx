import React from 'react';
import { GraduationCap } from 'lucide-react';
import { education } from '../../data/mock';
import './EducationSection.css';

const EducationSection = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-header">
        <h2 className="section-title">EDUCATION</h2>
        <p className="section-subtitle">Academic background</p>
      </div>

      <div className="education-grid">
        {education.map((edu) => (
          <div 
            key={edu.id} 
            className="education-card"
            style={{ backgroundColor: edu.color }}
          >
            <div className="edu-icon">
              <GraduationCap size={32} />
            </div>
            <div className="edu-content">
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
              <div className="edu-meta">
                <span className="edu-duration">{edu.duration}</span>
                {edu.percentage && (
                  <span className="edu-percentage">{edu.percentage}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;