import React, { useEffect, useState } from 'react';
import Particles from '../components/Particles';
import './Landing.css';

const USER_NAME = 'Pravi';

function Landing({ onEnter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="landing">
      <div className="cursor-glow" />

      <div className="aurora">
        <div className="aurora-blob a1" />
        <div className="aurora-blob a2" />
        <div className="aurora-blob a3" />
        <div className="aurora-blob a4" />
      </div>

      <div className="grid-overlay" />
      <Particles count={32} />

      <div className={`landing-content ${visible ? 'visible' : ''}`}>
        <p className="welcome-greeting">Welcome back, {USER_NAME} 👋</p>

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
