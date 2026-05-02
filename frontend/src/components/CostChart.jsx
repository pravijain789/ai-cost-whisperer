import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

/* Cyan-anchored palette — first bars get sky/cyan, rest provide variety */
const COLORS = [
  '#38bdf8', // sky-400  (primary)
  '#22d3ee', // cyan-400
  '#67e8f9', // cyan-300
  '#7dd3fc', // sky-300
  '#a78bfa', // violet-400
  '#818cf8', // indigo-400
  '#f472b6', // pink-400
  '#34d399', // emerald-400
  '#fbbf24', // amber-400
  '#fb923c', // orange-400
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(8, 9, 15, 0.95)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      borderRadius: '8px',
      padding: '10px 16px',
      fontFamily: "'Sora', sans-serif",
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      <div style={{
        color: 'rgba(245,245,245,0.42)',
        marginBottom: '5px',
        fontSize: '0.72rem',
        fontWeight: 400,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {payload[0].payload.service}
      </div>
      <div style={{
        fontWeight: 700,
        fontSize: '1rem',
        color: '#38bdf8',
        letterSpacing: '-0.02em',
      }}>
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
      <ResponsiveContainer width="100%" height={data.length * 44 + 40}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 52, left: 148, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tickFormatter={v => `$${v}`}
            tick={{
              fill: 'rgba(245,245,245,0.28)',
              fontSize: 11,
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
            }}
            axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="service"
            width={148}
            tick={{
              fill: 'rgba(245,245,245,0.55)',
              fontSize: 11,
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(56,189,248,0.04)' }}
          />
          <Bar dataKey="costUSD" radius={[0, 5, 5, 0]} maxBarSize={20}>
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
