import { useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';

function Hero({ onOpenResume }) {
  const [copied, setCopied] = useState(false);
  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);

  const developerSnippet = `const developer = {
  name: "${personalInfo.name}",
  education: "2nd Year B.E. CSE",
  institution: "PDKVCET, Chennai",
  cgpa: ${personalInfo.cgpa},
  coreStack: ["Java", "React.js", "Python", "SQL"],
  careerFocus: "Full-Stack Software Engineer",
  status: "Seeking Internship Opportunities",
  passions: [
    "Practical Software Engineering",
    "Smart India Hackathon Innovation",
    "Scalable Web Interfaces"
  ]
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(developerSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Column 1: Introductions & Bio */}
        <div className="hero-content">
          <div className="status-pill">
            <span className="status-indicator-dot"></span>
            <span>{personalInfo.availability}</span>
          </div>

          <div className="hero-headings">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </h1>
            <div className="hero-role-wrap">
              <span className="hero-role">
                {personalInfo.role} | Aspiring Software Engineer
              </span>
              <span className="hero-college">
                📍 {personalInfo.location} • 🎓 {personalInfo.collegeShort} (Grad: {personalInfo.graduation})
              </span>
            </div>
          </div>

          <p className="hero-summary">
            Building practical software solutions with <strong>Java</strong>, <strong>React</strong>, <strong>Python</strong>, and modern web technologies. Focused on crafting responsive, scalable web architectures and algorithmic problem solving.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              <span>🚀</span> View Projects
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              <span>🐙</span> GitHub
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-linkedin"
            >
              <span>💼</span> LinkedIn
            </a>
            <button onClick={onOpenResume} className="btn-secondary">
              <span>📄</span> Download Resume
            </button>
          </div>
        </div>

        {/* Column 2: Dedicated Photo Column (Front Page Photo Frame) */}
        <div className="hero-photo-col">
          <div className="photo-card-frame">
            <div className="photo-card-top-bar">
              <span className="photo-badge">PORTRAIT</span>
              <span className="photo-status-indicator">
                <span className="photo-status-dot"></span> Ready
              </span>
            </div>

            <div
              className="photo-slot-box"
              onClick={() => photoInputRef.current && photoInputRef.current.click()}
              title="Click to select profile photo"
            >
              {photo ? (
                <img src={photo} alt="Nishanth M S" className="uploaded-photo-preview" />
              ) : (
                <div className="photo-placeholder-wrap">
                  <div className="photo-avatar-silhouette">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="avatar-svg-icon"
                    >
                      <circle cx="50" cy="38" r="20" stroke="currentColor" strokeWidth="3" strokeDasharray="3 3" />
                      <path
                        d="M22 84C22 68.536 34.536 56 50 56C65.464 56 78 68.536 78 84"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="photo-slot-label">
                    <span className="photo-icon-camera">📷</span>
                    <span className="photo-slot-main-txt">Profile Photo</span>
                    <span className="photo-slot-sub-txt">Slot Ready • Click to upload</span>
                  </div>
                </div>
              )}
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                hidden
              />
            </div>

            <div className="photo-card-bottom">
              <span className="photo-card-name">Nishanth M S</span>
              <span className="photo-card-sub">2nd Year B.E. CSE • PDKVCET</span>
            </div>

            {photo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhoto(null);
                }}
                className="photo-remove-btn"
              >
                ✕ Clear Photo
              </button>
            )}
          </div>
        </div>

        {/* Column 3: Interactive Code Terminal Card */}
        <div className="hero-code-card">
          <div className="code-card-header">
            <div className="window-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <span className="terminal-title">developer_profile.ts</span>
            <button
              onClick={copyCode}
              style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }}
              title="Copy snippet"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
          <div className="code-card-body">
            <pre>
              <code>
                <span className="code-keyword">const</span> developer = &#123;{'\n'}
                {'  '}<span className="code-prop">name</span>: <span className="code-str">"{personalInfo.name}"</span>,{'\n'}
                {'  '}<span className="code-prop">education</span>: <span className="code-str">"2nd Year B.E. CSE"</span>,{'\n'}
                {'  '}<span className="code-prop">institution</span>: <span className="code-str">"PDKVCET, Chennai"</span>,{'\n'}
                {'  '}<span className="code-prop">cgpa</span>: <span className="code-num">{personalInfo.cgpa}</span>,{'\n'}
                {'  '}<span className="code-prop">coreStack</span>: [<span className="code-str">"Java"</span>, <span className="code-str">"React.js"</span>, <span className="code-str">"Python"</span>, <span className="code-str">"SQL"</span>],{'\n'}
                {'  '}<span className="code-prop">careerGoal</span>: <span className="code-str">"Software Engineer / Full-Stack"</span>,{'\n'}
                {'  '}<span className="code-prop">availability</span>: <span className="code-str">"Internships (Remote/Onsite)"</span>,{'\n'}
                {'  '}<span className="code-prop">passions</span>: [{'\n'}
                {'    '}<span className="code-str">"Practical Software Engineering"</span>,{'\n'}
                {'    '}<span className="code-str">"Smart India Hackathon 2026"</span>,{'\n'}
                {'    '}<span className="code-str">"Interactive Web Systems"</span>{'\n'}
                {'  '}]{'\n'}
                &#125;;
              </code>
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
