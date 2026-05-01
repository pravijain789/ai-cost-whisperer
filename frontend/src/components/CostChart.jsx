import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e', '#e91e63', '#00bcd4'];

function CostChart({ services }) {
  const data = services
    .filter(s => parseFloat(s.costUSD) > 0)
    .map(s => ({
      service: s.service.replace('Amazon ', '').replace('AWS ', ''),
      costUSD: parseFloat(s.costUSD),
    }))
    .sort((a, b) => b.costUSD - a.costUSD)
    .slice(0, 10);

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Cost by Service (USD)</h2>
        <p className="empty-message">No chargeable services this month — you're likely within the free tier!</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Cost by Service (USD)</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 140, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={v => `$${v}`} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="service" width={140} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`$${value.toFixed(4)}`, 'Cost (USD)']} />
          <Bar dataKey="costUSD" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CostChart;
