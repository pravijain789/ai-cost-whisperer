import React from 'react';

function InsightCard({ insights }) {
  return (
    <div className="insight-card">
      <div className="section-header">
        <span className="section-icon">🤖</span>
        <span className="section-title">AI Cost Insights</span>
      </div>
      <pre className="insight-text">{insights}</pre>
    </div>
  );
}

export default InsightCard;
