import React from 'react';

function InsightCard({ insights }) {
  return (
    <div className="insight-card">
      <h2>AI Cost Insights</h2>
      <pre className="insight-text">{insights}</pre>
    </div>
  );
}

export default InsightCard;
