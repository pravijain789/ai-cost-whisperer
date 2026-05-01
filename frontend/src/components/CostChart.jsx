import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = [
  '#818cf8', '#34d399', '#f472b6', '#fbbf24',
  '#38bdf8', '#a78bfa', '#fb923c', '#4ade80',
  '#e879f9', '#22d3ee',
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '10px 16px',
      fontSize: '0.85rem',
      color: '#f1f5f9',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <div style={{ color: 'rgba(241,245,249,0.5)', marginBottom: '4px', fontSize: '0.78rem' }}>
        {payload[0].payload.service}
      </div>
      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#4ade80' }}>
        ${payload[0].value.toFixed(4)}
      </div>
    </div>
  );
}

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
        <div className="section-header">
          <span className="section-icon">📊</span>
          <span className="section-title">Cost by Service (USD)</span>
        </div>
        <p className="empty-message">No chargeable services this month — you're within the free tier!</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="section-header">
        <span className="section-icon">📊</span>
        <span className="section-title">Cost by Service (USD)</span>
      </div>
      <ResponsiveContainer width="100%" height={data.length * 42 + 40}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 148, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={v => `$${v}`}
            tick={{ fill: 'rgba(241,245,249,0.35)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="service"
            width={148}
            tick={{ fill: 'rgba(241,245,249,0.6)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="costUSD" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CostChart;
