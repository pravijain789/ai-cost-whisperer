import React from 'react';
import './Navbar.css';

const NAV_LINKS = ['Features', 'Insights', 'Pricing', 'About', 'Contact'];

function Navbar({ onEnter }) {
  return (
    <nav className="site-nav">
      <div className="nav-logo">
        COST <span className="nav-logo-accent">AI</span>
      </div>

      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className="nav-link">
            {link}
          </a>
        ))}
      </div>

      <button className="nav-cta" onClick={onEnter}>
        Open Dashboard
      </button>
    </nav>
  );
}

export default Navbar;
