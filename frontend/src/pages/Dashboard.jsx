import React, { useState, useEffect } from 'react';
import CostChart from '../components/CostChart';
import ServiceTable from '../components/ServiceTable';
import InsightCard from '../components/InsightCard';
import { getCosts, getInsights } from '../services/api';
import './Dashboard.css';

function Dashboard() {
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

  if (loading) {
    return <div className="center-message">Loading your AWS costs...</div>;
  }

  if (error) {
    return <div className="center-message error">{error}</div>;
  }

  const period = costs[0];
  const services = period?.services || [];
  const totalUSD = services
    .reduce((sum, s) => sum + parseFloat(s.costUSD), 0)
    .toFixed(4);
  const totalINR = (parseFloat(totalUSD) * 85).toFixed(2);
  const activeServices = services.filter(s => parseFloat(s.costUSD) > 0).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>AI Cloud Cost Whisperer</h1>
        <p>
          AWS Billing Dashboard &mdash; {period?.timePeriod?.Start} to {period?.timePeriod?.End}
        </p>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Cost (USD)</span>
          <span className="stat-value">${totalUSD}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Cost (INR)</span>
          <span className="stat-value">₹{totalINR}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Services Active</span>
          <span className="stat-value">{activeServices}</span>
        </div>
      </div>

      <CostChart services={services} />
      <ServiceTable services={services} />
      <InsightCard insights={insights} />
    </div>
  );
}

export default Dashboard;
