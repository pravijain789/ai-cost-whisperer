import React from 'react';

function ServiceTable({ services }) {
  const sorted = [...services]
    .filter(s => parseFloat(s.costUSD) > 0)
    .sort((a, b) => parseFloat(b.costUSD) - parseFloat(a.costUSD));

  if (sorted.length === 0) {
    return (
      <div className="table-container">
        <div className="section-header">
          <span className="section-icon">📋</span>
          <span className="section-title">Cost Breakdown by Service</span>
        </div>
        <p className="empty-message">No chargeable services found this month.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="section-header">
        <span className="section-icon">📋</span>
        <span className="section-title">Cost Breakdown by Service</span>
      </div>
      <table className="cost-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Cost (USD)</th>
            <th>Cost (INR)</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => (
            <tr key={i}>
              <td><span className="rank-badge">{i + 1}</span></td>
              <td style={{ color: 'rgba(241,245,249,0.82)', fontWeight: 500 }}>{s.service}</td>
              <td><span className="usd-badge">${s.costUSD}</span></td>
              <td><span className="inr-text">₹{s.costINR}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
