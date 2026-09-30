import { educationData, certificationsData } from '../data/portfolioData';

function EducationCertifications() {
  return (
    <section id="education" className="edu-cert-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Qualifications</span>
          <h2 className="section-title">Education &amp; Certifications</h2>
          <p className="section-subtitle">
            Academic foundations coupled with industry-recognized certifications and self-driven engineering tracks.
          </p>
        </div>

        <div className="edu-cert-grid">
          {/* Education Timeline */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎓</span> Academic Education
            </h3>

            {educationData.map((edu, idx) => (
              <div key={idx} className="edu-timeline-card">
                <div className="edu-head">
                  <div className="edu-icon-circle">🏛️</div>
                  <div>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-college">{edu.institution}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>📍 {edu.location}</span>
                  </div>
                </div>

                <div className="edu-tags-row">
                  <span className="edu-pill">📅 {edu.period}</span>
                  <span className="edu-pill" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-secondary)' }}>
                    ⭐ {edu.score}
                  </span>
                  <span className="edu-pill" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                    {edu.status}
                  </span>
                </div>

                <ul className="edu-bullets">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications Deck */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📜</span> Certifications &amp; Learning
            </h3>

            <div className="cert-deck">
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div
                    className="cert-icon-box"
                    style={{
                      background: `${cert.color}18`,
                      border: `1px solid ${cert.color}35`,
                      color: cert.color
                    }}
                  >
                    {cert.icon}
                  </div>

                  <div className="cert-body">
                    <div className="cert-top-row">
                      <h4 className="cert-title">{cert.title}</h4>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: cert.color,
                          background: `${cert.color}15`,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}
                      >
                        {cert.badge}
                      </span>
                    </div>

                    <span className="cert-issuer">Issued by {cert.issuer}</span>
                    <p className="cert-desc">{cert.desc}</p>

                    <div className="cert-skills">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="cert-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationCertifications;
