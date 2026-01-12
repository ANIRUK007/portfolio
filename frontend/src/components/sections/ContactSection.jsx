import React from 'react';
import { Mail, Phone, Github, Linkedin, Download, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/mock';
import './ContactSection.css';

const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <div className="contact-header">
          <h2 className="section-title">LET'S WORK TOGETHER</h2>
          <p className="section-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <div className="contact-grid">
          {/* Email Block */}
          <a href={`mailto:${personalInfo.email}`} className="contact-block email-block">
            <div className="contact-icon">
              <Mail size={32} />
            </div>
            <div className="contact-info">
              <span className="contact-label">EMAIL</span>
              <span className="contact-value">{personalInfo.email}</span>
            </div>
          </a>

          {/* Phone Block */}
          <a href={`tel:${personalInfo.phone}`} className="contact-block phone-block">
            <div className="contact-icon">
              <Phone size={32} />
            </div>
            <div className="contact-info">
              <span className="contact-label">PHONE</span>
              <span className="contact-value">{personalInfo.phone}</span>
            </div>
          </a>

          {/* GitHub Block */}
          <a 
            href={`https://github.com/${personalInfo.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-block github-block"
          >
            <div className="contact-icon">
              <Github size={32} />
            </div>
            <div className="contact-info">
              <span className="contact-label">GITHUB</span>
              <span className="contact-value">@{personalInfo.github}</span>
            </div>
          </a>

          {/* LinkedIn Block */}
          <a 
            href={`https://linkedin.com/in/${personalInfo.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-block linkedin-block"
          >
            <div className="contact-icon">
              <Linkedin size={32} />
            </div>
            <div className="contact-info">
              <span className="contact-label">LINKEDIN</span>
              <span className="contact-value">/{personalInfo.linkedin}</span>
            </div>
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="contact-actions">
          <a href={personalInfo.resumeLink} className="action-button resume-button" download>
            <Download size={20} />
            DOWNLOAD RESUME
          </a>
          <a href={`mailto:${personalInfo.email}`} className="action-button email-button">
            <Mail size={20} />
            SEND EMAIL
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 {personalInfo.name}. Built with passion and 3D blocks.
          </p>
          <button onClick={scrollToTop} className="back-to-top">
            <ArrowUp size={20} />
            BACK TO TOP
          </button>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;