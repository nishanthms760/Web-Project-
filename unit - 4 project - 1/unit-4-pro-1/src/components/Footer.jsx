import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-text">Form<span className="brand-highlight">Nova</span></span>
          </div>
          <p className="footer-tagline">
            Unit 4 Project 1 &bull; Advanced React Validation, Dependent Controls & State Architecture
          </p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Application</h4>
            <Link to="/">Overview</Link>
            <Link to="/register">Registration System</Link>
            <a href="#features">Architecture Features</a>
          </div>
          <div className="link-group">
            <h4>Engineering Highlights</h4>
            <span>Touched-Field Validation</span>
            <span>Spatial Geo-Hierarchy</span>
            <span>Client Image Analyzer</span>
            <span>Entropy Password Meter</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} FormNova &bull; Unit-4 Project-1 Implementation</p>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span>Client State: Reactive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
