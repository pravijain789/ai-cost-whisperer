import React from 'react';

function parseLines(text) {
  return text.split('\n').map((raw, i) => {
    const line = raw.trim();
    if (!line) return null;
    if (line.endsWith(':') && !/^\d/.test(line)) return { type: 'heading', text: line, key: i };
    if (/^\d+\./.test(line)) return { type: 'item', text: line, key: i };
    return { type: 'body', text: line, key: i };
  }).filter(Boolean);
}

function InsightCard({ insights }) {
  const lines = parseLines(insights || '');
  const now = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="insight-card">

      {/* Header bar */}
      <div className="insight-topbar">
        <div className="insight-ai-badge">
          <span className="insight-ai-pulse" />
          AI ANALYSIS
        </div>
        <div className="insight-meta-row">
          <span className="insight-meta">Groq Llama 3.3 &middot; {now}</span>
        </div>
      </div>

      {/* Body */}
      <div className="insight-body">
        {lines.map(({ type, text, key }) => {
          if (type === 'heading') return (
            <p key={key} className="il-heading">{text}</p>
          );
          if (type === 'item') return (
            <div key={key} className="il-item">
              <span className="il-bullet" />
              <span className="il-item-text">{text.replace(/^\d+\.\s*/, '')}</span>
            </div>
          );
          return (
            <p key={key} className="il-body">{text}</p>
          );
        })}
      </div>

      {/* Footer */}
      <div className="insight-footer">
        <span>Powered by AWS Cost Explorer &middot; AI-driven insights &middot; Real-time data</span>
      </div>

    </div>
  );
}

export default InsightCard;
