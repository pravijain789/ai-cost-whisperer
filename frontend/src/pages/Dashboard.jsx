import React, { useState, useEffect } from 'react';
import CostChart from '../components/CostChart';
import ServiceTable from '../components/ServiceTable';
import InsightCard from '../components/InsightCard';
import Particles from '../components/Particles';
import { getCosts, getInsights } from '../services/api';
import './Dashboard.css';

const SplineScene = React.lazy(() => import('@splinetool/react-spline'));

const USER_NAME = 'Pravi';

function Dashboard({ onBack }) {
  const [costs, setCosts] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [costsRes, insightsRes] = await Promise.all([
          getCosts(),
          getInsights(),
        ]);
        setCosts(costsRes.data);
        setInsights(insightsRes.insights);
      } catch (err) {
        setError('Could not load data. Make sure the backend server is running on port 5000.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--cx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--cy', `${e.clientY - rect.top}px`);
  };

  if (loading) {
    return (
      <div className="center-message">
        <div className="loading-spinner" />
        Fetching your AWS costs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="center-message error">
        <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>⚠️</span>
        {error}
      </div>
    );
  }

  const period = costs[0];
  const services = period?.services || [];
  const totalUSD = services.reduce((sum, s) => sum + parseFloat(s.costUSD), 0).toFixed(4);
  const totalINR = (parseFloat(totalUSD) * 85).toFixed(2);
  const activeServices = services.filter(s => parseFloat(s.costUSD) > 0).length;

  return (
    <div className="dashboard">
      <div className="cursor-glow" />

      {/* ── Spline 3D background ── */}
      <div className="dash-spline-wrap">
        <React.Suspense fallback={<div className="dash-spline-fallback" />}>
          <SplineScene scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" />
        </React.Suspense>
      </div>
      <div className="dash-spline-overlay" />

      <div className="dash-aurora">
        <div className="da-blob da1" />
        <div className="da-blob da2" />
        <div className="da-blob da3" />
      </div>
      <div className="dash-grid" />
      <Particles count={20} />

      {/* ── Header ── */}
      <header className="dashboard-header">
        <div className="header-inner">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <div className="header-text">
            <h1>CLOUD COST <span className="header-accent">WHISPERER</span></h1>
            <p>AWS Billing Dashboard &mdash; {period?.timePeriod?.Start} to {period?.timePeriod?.End}</p>
          </div>
          <div className="header-right">
            <span className="header-greeting">Hi, {USER_NAME} 👋</span>
            <div className="header-live">
              <span className="live-dot" />
              Live
            </div>
          </div>
        </div>
      </header>

      {/* ── Stat cards ── */}
      <div className="stats-row">
        <div className="stat-card stat-sky" onMouseMove={handleCardMove}>
          <div className="card-spotlight" />
          <div className="stat-fill" />
          <span className="stat-super">This month</span>
          <span className="stat-icon">💵</span>
          <span className="stat-label">Total Cost (USD)</span>
          <span className="stat-value">${totalUSD}</span>
        </div>
        <div className="stat-card stat-cyan" onMouseMove={handleCardMove}>
          <div className="card-spotlight" />
          <div className="stat-fill" />
          <span className="stat-super">This month</span>
          <span className="stat-icon">₹</span>
          <span className="stat-label">Total Cost (INR)</span>
          <span className="stat-value">₹{totalINR}</span>
        </div>
        <div className="stat-card stat-teal" onMouseMove={handleCardMove}>
          <div className="card-spotlight" />
          <div className="stat-fill" />
          <span className="stat-super">AWS services</span>
          <span className="stat-icon">☁️</span>
          <span className="stat-label">Services Active</span>
          <span className="stat-value">{activeServices}</span>
        </div>
      </div>

      {/* ── Chart + Table side-by-side ── */}
      <div className="content-grid">
        <CostChart services={services} />
        <ServiceTable services={services} />
      </div>

      {/* ── AI Insights full-width ── */}
      <div className="insights-wrap">
        <InsightCard insights={insights} />
      </div>
    </div>
  );
}

export default Dashboard;
