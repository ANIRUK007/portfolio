import React from 'react';
import { Briefcase, Award, Users, FlaskConical } from 'lucide-react';
import { experience } from '../../data/mock';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'Research':
        return <FlaskConical size={24} />;
      case 'Development':
        return <Briefcase size={24} />;
      case 'Leadership':
        return <Award size={24} />;
      case 'Community':
        return <Users size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="section-header">
        <h2 className="section-title">EXPERIENCE</h2>
        <p className="section-subtitle">My professional journey</p>
      </div>

      <div className="experience-timeline">
        {experience.map((exp, idx) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-connector">
              <div className="timeline-dot" style={{ backgroundColor: exp.color }}></div>
              {idx < experience.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div 
              className="experience-card"
              style={{ backgroundColor: exp.color }}
            >
              <div className="exp-header">
                <div className="exp-icon">
                  {getIcon(exp.type)}
                </div>
                <div className="exp-meta">
                  <span className="exp-type">{exp.type}</span>
                  <span className="exp-duration">{exp.duration}</span>
                </div>
              </div>
              <h3 className="exp-role">{exp.role}</h3>
              <p className="exp-organization">{exp.organization}</p>
              <p className="exp-description">{exp.description}</p>
              <div className="exp-achievements">
                {exp.achievements.map((achievement, achIdx) => (
                  <div key={achIdx} className="achievement-item">
                    <span className="achievement-bullet">▸</span>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;