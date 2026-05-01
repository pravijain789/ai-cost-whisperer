import React, { useEffect, useState } from 'react';
import './Landing.css';

function Landing({ onEnter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />

      <div className={`landing-content ${visible ? 'visible' : ''}`}>
        <div className="landing-badge">
          <span className="badge-dot" />
          Live AWS Cost Intelligence
        </div>

        <h1 className="landing-title">
          AI Cloud Cost<br />
          <span className="gradient-text">Whisperer</span>
        </h1>

        <p className="landing-subtitle">
          Understand your AWS bill in plain English.<br />
          Real-time data. AI-powered explanations. Zero confusion.
        </p>

        <div className="landing-features">
          <div className="feature-pill">
            <span>📊</span> Real-time billing data
          </div>
          <div className="feature-pill">
            <span>🤖</span> AI cost insights
          </div>
          <div className="feature-pill">
            <span>💡</span> Saving recommendations
          </div>
        </div>

        <button className="cta-button" onClick={onEnter}>
          <span>View Dashboard</span>
          <span className="cta-arrow">→</span>
        </button>

        <p className="landing-hint">Powered by AWS Cost Explorer + AI</p>
      </div>
    </div>
  );
}

export default Landing;
