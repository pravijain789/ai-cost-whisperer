import React from 'react';

function ServiceTable({ services }) {
  const sorted = [...services]
    .filter(s => parseFloat(s.costUSD) > 0)
    .sort((a, b) => parseFloat(b.costUSD) - parseFloat(a.costUSD));

  const maxCost = sorted.length > 0 ? parseFloat(sorted[0].costUSD) : 1;

  if (sorted.length === 0) {
    return (
      <div className="table-container">
        <div className="section-header">
          <span className="section-icon">📋</span>
          <span className="section-title">Cost Breakdown</span>
        </div>
        <p className="empty-message">No chargeable services found this month.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="section-header">
        <span className="section-icon">📋</span>
        <span className="section-title">Cost Breakdown</span>
        <span className="section-count">{sorted.length} services</span>
      </div>

      <div className="service-list">
        {sorted.map((s, i) => {
          const pct = maxCost > 0
            ? ((parseFloat(s.costUSD) / maxCost) * 100).toFixed(1)
            : 0;

          return (
            <div key={i} className="service-row">
              <div className="service-rank">{i + 1}</div>

              <div className="service-info">
                <span className="service-name">{s.service}</span>
                <div className="service-bar-track">
                  <div
                    className="service-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="service-costs">
                <span className="usd-badge">${s.costUSD}</span>
                <span className="inr-text">₹{s.costINR}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceTable;
