import React, { useMemo } from 'react';
import './Particles.css';

function Particles({ count = 28 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.7,
        dur: Math.random() * 22 + 18,
        delay: -(Math.random() * 28),
        op: Math.random() * 0.26 + 0.05,
      })),
    [count]
  );

  return (
    <div className="particles-wrap" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="p-dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.op,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
