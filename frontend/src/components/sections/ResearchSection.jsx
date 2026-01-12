import React from 'react';
import { Lightbulb, Award, Trophy } from 'lucide-react';
import { researchInterests, achievements } from '../../data/mock';
import './ResearchSection.css';

const ResearchSection = () => {
  return (
    <section id="research" className="research-section">
      <div className="section-header">
        <h2 className="section-title">RESEARCH & ACHIEVEMENTS</h2>
        <p className="section-subtitle">Areas of interest and accomplishments</p>
      </div>

      <div className="research-content">
        {/* Research Interests */}
        <div className="research-block">
          <div className="block-header">
            <Lightbulb size={32} />
            <h3 className="block-title">RESEARCH INTERESTS</h3>
          </div>
          <div className="interests-list">
            {researchInterests.map((interest, idx) => (
              <div key={idx} className="interest-item">
                <span className="interest-bullet">•</span>
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="achievement-card"
              style={{ backgroundColor: achievement.color }}
            >
              <div className="achievement-icon">
                {achievement.type === 'Hackathon' && <Trophy size={28} />}
                {achievement.type === 'Event Organization' && <Award size={28} />}
                {achievement.type === 'Leadership' && <Award size={28} />}
              </div>
              <h4 className="achievement-title">{achievement.title}</h4>
              <span className="achievement-type">{achievement.type}</span>
              <p className="achievement-description">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;