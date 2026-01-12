import React from 'react';
import { Github, GitBranch, Star, TrendingUp, Music, Play } from 'lucide-react';
import { githubStats, spotifyData, personalInfo } from '../../data/mock';
import './ActivitySection.css';

const ActivitySection = () => {
  return (
    <section id="activity" className="activity-section">
      <div className="section-header">
        <h2 className="section-title">LIVE ACTIVITY</h2>
        <p className="section-subtitle">What I'm currently up to</p>
      </div>

      <div className="activity-grid">
        {/* GitHub Stats Block */}
        <div className="activity-block github-block">
          <div className="block-header">
            <Github size={32} />
            <h3 className="block-title">GITHUB STATS</h3>
          </div>
          <div className="github-stats">
            <div className="stat-item">
              <TrendingUp size={24} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{githubStats.contributions}</span>
                <span className="stat-label">CONTRIBUTIONS</span>
              </div>
            </div>
            <div className="stat-item">
              <GitBranch size={24} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{githubStats.repos}</span>
                <span className="stat-label">REPOSITORIES</span>
              </div>
            </div>
            <div className="stat-item">
              <Star size={24} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{githubStats.stars}</span>
                <span className="stat-label">STARS EARNED</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="streak-badge">{githubStats.streak} DAY STREAK</span>
            </div>
          </div>
          <a 
            href={`https://github.com/${personalInfo.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block-link"
          >
            VIEW PROFILE →
          </a>
        </div>

        {/* Spotify Block */}
        <div className="activity-block spotify-block">
          <div className="block-header">
            <Music size={32} />
            <h3 className="block-title">CODING PARTNER</h3>
          </div>
          <div className="spotify-content">
            <div className="album-art">
              <img src={spotifyData.albumArt} alt="Album Art" />
              <div className="play-overlay">
                <Play size={48} />
              </div>
            </div>
            <div className="spotify-info">
              <span className="now-playing">NOW PLAYING</span>
              <h4 className="track-name">{spotifyData.currentlyPlaying}</h4>
              <p className="artist-name">{spotifyData.artist}</p>
              <div className="audio-visualizer">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </div>
          <a 
            href={spotifyData.playlistUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block-link"
          >
            OPEN PLAYLIST →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;