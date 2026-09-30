import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

function Navbar({ theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#projects" className="nav-brand">
          <div className="brand-symbol">N</div>
          <div className="brand-text-wrap">
            <span className="brand-name">
              {personalInfo.name}
              <span className="unit-tag">Projects Portal</span>
            </span>
            <span className="brand-sub">10 Live Applications &bull; B.E. CSE</span>
          </div>
        </a>

        {/* Desktop Links & Actions */}
        <div className="nav-actions">
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
          >
            <span>🐙</span> GitHub
          </a>

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-linkedin"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
          >
            <span>💼</span> LinkedIn
          </a>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
