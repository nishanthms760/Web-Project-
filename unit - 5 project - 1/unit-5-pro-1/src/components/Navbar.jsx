import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/students', label: 'Students' },
    { to: '/add-student', label: 'Add Student' },
    { to: '/marks', label: 'Marks' },
    { to: '/reports', label: 'Reports' },
    { to: '/results', label: 'Results' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="edu-navbar">
      <div className="edu-container nav-flex">
        {/* Brand Logo */}
        <Link to="/" className="edu-brand">
          <div className="brand-logo-icon">
            🎓
          </div>
          <div className="brand-text-block">
            <span className="brand-title">Edu<span className="brand-accent">Report</span></span>
            <span className="brand-subtitle">Student Report Card System</span>
          </div>
          <span className="unit-badge">Unit 5 • Pro 1</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav-menu">
          {navLinks.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Button & Mobile Hamburger */}
        <div className="nav-right-actions">
          <Link to="/add-student" className="btn-nav-action">
            <span>+</span> Register Student
          </Link>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
