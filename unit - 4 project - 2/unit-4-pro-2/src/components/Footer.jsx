import { personalInfo } from '../data/portfolioData';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-symbol" style={{ width: '32px', height: '32px', fontSize: '1rem' }}>
                N
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{personalInfo.name}</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Computer Science Engineering Student • {personalInfo.collegeShort}
            </p>
          </div>

          <div className="footer-social-links">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              🐙
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              💼
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-icon-btn"
              title="Email"
              aria-label="Email"
            >
              📧
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved. &bull; Unit 4 Project 2 (React Portfolio)
          </p>

          <button onClick={scrollToTop} className="footer-back-to-top">
            <span>↑</span> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
