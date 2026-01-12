import React from 'react';
import { Music, Play } from 'lucide-react';
import { spotifyData, personalInfo } from '../../data/mock';
import GitHubContributions from './GitHubContributions';
import './ActivitySection.css';

const ActivitySection = () => {
  return (
    <section id="activity" className="activity-section">
      <div className="activity-container">
        <div className="section-header">
          <h2 className="section-title">LIVE ACTIVITY</h2>
          <p className="section-subtitle">What I'm currently up to</p>
        </div>

        <div className="activity-grid">
          {/* GitHub Contributions Block with Real Data */}
          <GitHubContributions username={personalInfo.github} />

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
      </div>
    </section>
  );
};

export default ActivitySection;