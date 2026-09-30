import { experienceData, achievementsData } from '../data/portfolioData';

function ExperienceAchievements() {
  return (
    <section id="experience" className="exp-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Milestones</span>
          <h2 className="section-title">Experience &amp; Achievements</h2>
          <p className="section-subtitle">
            Hands-on technical initiative, hackathon problem solving, and consistent academic recognition.
          </p>
        </div>

        <div className="exp-grid">
          {/* Experience Timeline */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💼</span> Practical Experience &amp; Hackathons
            </h3>

            <div className="timeline-list">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-item-header">
                    <div>
                      <h4 className="timeline-role">{exp.role}</h4>
                      <p className="timeline-org">{exp.organization}</p>
                    </div>
                    <span className="timeline-period">{exp.period} • {exp.type}</span>
                  </div>

                  <ul className="timeline-bullets">
                    {exp.details.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🏆</span> Key Achievements
            </h3>

            <div className="achievements-column">
              {achievementsData.map((achieve, idx) => (
                <div key={idx} className="achievement-card">
                  <span className="achieve-icon">{achieve.icon}</span>
                  <div className="achieve-info">
                    <h4>{achieve.title}</h4>
                    <span className="achieve-sub">{achieve.subtitle}</span>
                    <p>{achieve.desc}</p>
                  </div>
                </div>
              ))}

              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  marginTop: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Immediate Availability</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Actively preparing for software development internships and technical roles. Available for remote work as well as on-site engagements in Chennai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceAchievements;
