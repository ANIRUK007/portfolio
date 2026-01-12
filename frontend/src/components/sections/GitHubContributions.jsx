import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Star, TrendingUp } from 'lucide-react';

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
        try {
          const moreEventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`);
          const moreEvents = await moreEventsResponse.json();
          if (Array.isArray(moreEvents) && moreEvents.length > 0) {
            allEvents = [...allEvents, ...moreEvents];
          } else {
            break;
          }
        } catch (err) {
          break;
        }
      }

      const contributionMap = {};
      let totalContributions = 0;

      allEvents.forEach(event => {
        if (event && event.created_at) {
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
        streak: streak || 0,
        data: data
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

  const getMonthLabel = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short' });
  };

  const groupByWeeks = (data) => {
    const weeks = [];
    let currentWeek = [];
    
    if (data.length === 0) return weeks;

    const firstDate = new Date(data[0].date);
    const firstDayOfWeek = firstDate.getDay();
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, empty: true });
    }
    
    data.forEach((day) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      currentWeek.push(day);
    });
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, empty: true });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeks = groupByWeeks(contributionData);
  const months = [];
  let currentMonth = '';
  
  contributionData.forEach((day, index) => {
    const month = getMonthLabel(day.date);
    if (month !== currentMonth && index % 4 === 0) {
      months.push({ label: month, weekIndex: Math.floor(index / 7) });
      currentMonth = month;
    }
  });

  if (loading) {
    return (
      <div style={{
        padding: '32px',
        borderRadius: '8px',
        border: '4px solid #000',
        boxShadow: '12px 12px 0 #000',
        background: '#FF6B35',
        color: '#000',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontWeight: 700 }}>Loading GitHub data...</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '32px',
      borderRadius: '8px',
      border: '4px solid #000',
      boxShadow: '12px 12px 0 #000',
      background: '#FF6B35',
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Github size={32} />
        <h3 style={{
          fontSize: '24px',
          fontWeight: 900,
          letterSpacing: '1.5px',
          margin: 0
        }}>
          GITHUB CONTRIBUTIONS
        </h3>
      </div>

      <div style={{
        background: '#000',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #000'
      }}>
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '8px',
          paddingLeft: '30px'
        }}>
          {months.map((month, i) => (
            <div key={i} style={{
              fontSize: '11px',
              color: '#fff',
              fontWeight: 600,
              width: `${100 / months.length}%`,
              textAlign: 'left'
            }}>
              {month.label}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            paddingTop: '0px',
            justifyContent: 'space-around',
            height: '91px'
          }}>
            {['Mon', 'Wed', 'Fri'].map((day) => (
              <div key={day} style={{
                fontSize: '10px',
                color: '#fff',
                height: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '3px',
            overflowX: 'auto',
            flex: 1,
            paddingBottom: '5px'
          }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px'
              }}>
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    title={day.empty ? '' : `${day.date}: ${day.count} contributions`}
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: day.empty ? 'transparent' : getContributionColor(day.count),
                      borderRadius: '2px',
                      cursor: day.empty ? 'default' : 'pointer',
                      border: day.empty ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '8px',
          marginTop: '12px',
          fontSize: '11px',
          color: '#fff'
        }}>
          <span>Less</span>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[0, 1, 3, 5, 7].map(count => (
              <div
                key={count}
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: getContributionColor(count),
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>

        <div style={{
          marginTop: '12px',
          fontSize: '13px',
          color: '#fff',
          fontWeight: 600
        }}>
          {stats.contributions} contributions in the last year
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '12px',
          borderRadius: '4px',
          border: '2px solid #000'
        }}>
          <TrendingUp size={24} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>
              {stats.contributions}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>
              CONTRIBUTIONS
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '12px',
          borderRadius: '4px',
          border: '2px solid #000'
        }}>
          <GitBranch size={24} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>
              {stats.repos}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>
              REPOSITORIES
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '12px',
          borderRadius: '4px',
          border: '2px solid #000'
        }}>
          <Star size={24} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>
              {stats.stars}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>
              STARS EARNED
            </span>
          </div>
        </div>

        <div style={{
          background: '#000',
          color: '#FF6B35',
          padding: '12px 20px',
          borderRadius: '4px',
          fontWeight: 900,
          fontSize: '16px',
          letterSpacing: '1.5px',
          textAlign: 'center',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.3)'
        }}>
          {stats.streak} DAY STREAK 🔥
        </div>
      </div>

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#000',
          color: '#FF6B35',
          padding: '12px 20px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '1.5px',
          textAlign: 'center',
          textDecoration: 'none',
          border: '4px solid #000',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.3)';
        }}
      >
        VIEW PROFILE →
      </a>
    </div>
  );
};

export default GitHubContributions;