import React from 'react';

function ServiceTable({ services }) {
  const sorted = [...services]
    .filter(s => parseFloat(s.costUSD) > 0)
    .sort((a, b) => parseFloat(b.costUSD) - parseFloat(a.costUSD));

  if (sorted.length === 0) {
    return (
      <div className="table-container">
        <h2>Cost Breakdown by Service</h2>
        <p className="empty-message">No chargeable services found this month.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Cost Breakdown by Service</h2>
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
              <td>{i + 1}</td>
              <td>{s.service}</td>
              <td>${s.costUSD}</td>
              <td>₹{s.costINR}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
