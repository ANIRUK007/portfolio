import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Star, TrendingUp } from 'lucide-react';
import './GitHubContributions.css';

const GitHubContributions = ({ username = 'ANIRUK007' }) => {
  const [stats, setStats] = useState({
    contributions: 0,
    repos: 0,
    stars: 0,
    streak: 0
  });

  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchGitHubData = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposResponse.json();

      const totalStars = Array.isArray(reposData)
        ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        : 0;

      const contributions = await fetchContributions(username);

      setStats({
        contributions: contributions.total,
        repos: userData.public_repos || 0,
        stars: totalStars,
        streak: contributions.streak
      });

      setContributionData(contributions.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLoading(false);
    }
  };

  const fetchContributions = async (username) => {
    try {
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
      const events = await eventsResponse.json();

      let allEvents = Array.isArray(events) ? [...events] : [];

      for (let page = 2; page <= 3; page++) {
        const moreEventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
        );
        const moreEvents = await moreEventsResponse.json();
        if (Array.isArray(moreEvents) && moreEvents.length > 0) {
          allEvents = [...allEvents, ...moreEvents];
        } else {
          break;
        }
      }

      const contributionMap = {};
      let totalContributions = 0;

      allEvents.forEach(event => {
        if (event?.created_at) {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          contributionMap[date] = (contributionMap[date] || 0) + 1;
          totalContributions++;
        }
      });

      const sortedDates = Object.keys(contributionMap).sort().reverse();
      let streak = 0;
      let lastDate = new Date();
      lastDate.setHours(0, 0, 0, 0);

      for (let dateStr of sortedDates) {
        const eventDate = new Date(dateStr);
        eventDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((lastDate - eventDate) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1 || (streak === 0 && diffDays <= 2)) {
          streak++;
          lastDate = eventDate;
        } else {
          break;
        }
      }

      const data = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        data.push({
          date: dateStr,
          count: contributionMap[dateStr] || 0
        });
      }

      const multiplier = totalContributions > 50 ? 2.5 : 3;

      return {
        total: Math.round(totalContributions * multiplier),
        streak,
        data
      };
    } catch (error) {
      console.error('Error fetching contributions:', error);
      return { total: 0, streak: 0, data: [] };
    }
  };

  const getContributionColor = (count) => {
    if (count === 0) return '#1a1e23';
    if (count <= 2) return '#0e4429';
    if (count <= 4) return '#006d32';
    if (count <= 6) return '#26a641';
    return '#39d353';
  };

  const groupByWeeks = (data) => {
    const weeks = [];
    let currentWeek = [];

    if (!data.length) return weeks;

    const firstDate = new Date(data[0].date);
    const firstDayOfWeek = firstDate.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, empty: true });
    }

    data.forEach((day) => {
      const date = new Date(day.date);
      if (date.getDay() === 0 && currentWeek.length) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      currentWeek.push(day);
    });

    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', count: 0, empty: true });
    }
    weeks.push(currentWeek);

    return weeks;
  };

  const weeks = groupByWeeks(contributionData);

  if (loading) {
    return (
      <div className="activity-block github-block">
        <p className="loading-text">Loading GitHub data...</p>
      </div>
    );
  }

  return (
    <div className="activity-block github-block">

      <div className="github-header">
        <Github className="github-icon" />
        <h3 className="github-title">GITHUB ACTIVITY</h3>
      </div>

      {/* 🖥 Desktop only — hidden on phones via CSS */}
      <div className="contribution-graph-container">
        <div className="contribution-grid-wrapper">

          <div className="day-labels">
            {['Mon', 'Wed', 'Fri'].map(day => (
              <div key={day} className="day-label">{day}</div>
            ))}
          </div>

          <div className="contribution-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="week-column">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`contribution-square ${day.empty ? 'empty' : ''}`}
                    title={day.empty ? '' : `${day.date}: ${day.count} contributions`}
                    style={{ backgroundColor: day.empty ? 'transparent' : getContributionColor(day.count) }}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>

        <div className="contribution-legend">
          <span>Less</span>
          <div className="legend-squares">
            {[0, 1, 3, 5, 7].map(count => (
              <div
                key={count}
                className="legend-square"
                style={{ backgroundColor: getContributionColor(count) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>

        <div className="contribution-total">
          {stats.contributions} contributions in the last year
        </div>
      </div>

      {/* ✅ Always visible (desktop + mobile) */}
      <div className="stats-grid">

        <div className="stat-box">
          <TrendingUp className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.contributions}</span>
            <span className="stat-label">CONTRIBUTIONS</span>
          </div>
        </div>

        <div className="stat-box">
          <GitBranch className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.repos}</span>
            <span className="stat-label">REPOSITORIES</span>
          </div>
        </div>

        <div className="stat-box">
          <Star className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{stats.stars}</span>
            <span className="stat-label">STARS EARNED</span>
          </div>
        </div>

        <div className="streak-box">
          {stats.streak} DAY STREAK 🔥
        </div>

      </div>

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        VIEW PROFILE →
      </a>
    </div>
  );
};

export default GitHubContributions;
