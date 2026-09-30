import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="edu-footer">
      <div className="edu-container footer-content-grid">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="footer-logo-icon">🎓</span>
            <span className="footer-brand-name">Edu<span>Report</span></span>
          </div>
          <p className="footer-tagline">
            Professional Student Report Card &amp; Academic Performance Management System. Streamlining educational records, marks computation, and automated transcript delivery.
          </p>
          <div className="footer-badges">
            <span className="footer-pill">React 19 Architecture</span>
            <span className="footer-pill">LocalStorage Powered</span>
            <span className="footer-pill">Unit 5 Project 1</span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Portal Navigation</h4>
          <Link to="/">Home Overview</Link>
          <Link to="/dashboard">Performance Dashboard</Link>
          <Link to="/students">Student Directory</Link>
          <Link to="/add-student">Register New Student</Link>
          <Link to="/marks">Marks Entry System</Link>
        </div>

        <div className="footer-links-col">
          <h4>Academic Reports</h4>
          <Link to="/reports">Report Cards Grid</Link>
          <Link to="/results">Results &amp; Analytics</Link>
          <Link to="/about">System Architecture</Link>
          <Link to="/contact">Helpdesk &amp; Support</Link>
        </div>

        <div className="footer-links-col">
          <h4>Examination Office</h4>
          <p className="footer-contact-item">📍 PDKVCET Campus, Chennai, Tamil Nadu</p>
          <p className="footer-contact-item">📧 exam-portal@edureport.edu</p>
          <p className="footer-contact-item">📞 +91 (044) 2834-5678</p>
          <p className="footer-contact-item">🕒 Mon - Sat: 9:00 AM - 5:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="edu-container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} EduReport Academic Portal &bull; Unit 5 Project 1. All rights reserved.</p>
          <div className="footer-status-pill">
            <span className="pulse-indicator"></span>
            <span>Academic Engine: Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
