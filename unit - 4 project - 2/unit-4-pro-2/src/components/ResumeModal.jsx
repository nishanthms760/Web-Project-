import { personalInfo, skillsData, educationData, certificationsData, featuredProjects, achievementsData } from '../data/portfolioData';

function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>📄</span>
            <h3>Nishanth M S — Curriculum Vitae</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              🖨️ Print / Save PDF
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Printable Resume Container */}
          <div className="printable-resume">
            {/* Header */}
            <div className="resume-header">
              <h1>{personalInfo.name}</h1>
              <div className="resume-role">{personalInfo.role} • {personalInfo.careerGoal}</div>
              <div className="resume-contacts">
                <span>📍 {personalInfo.location}</span>
                <span>📧 {personalInfo.email}</span>
                <span>🐙 github.com/{personalInfo.githubUsername}</span>
                <span>💼 linkedin.com/in/nishanthms760</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="resume-sec">
              <h2>Career Summary</h2>
              <p>{personalInfo.about}</p>
            </div>

            {/* Education */}
            <div className="resume-sec">
              <h2>Education</h2>
              {educationData.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>{edu.degree}</span>
                    <span>{edu.period}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4f46e5', fontWeight: 600 }}>
                    <span>{edu.institution}, {edu.location}</span>
                    <span>{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="resume-sec">
              <h2>Technical Skills</h2>
              <p>
                <strong>Programming Languages &amp; Fundamentals:</strong> Java, Python, JavaScript, OOP Concepts, Data Structures &amp; Algorithms, Problem Solving
              </p>
              <p style={{ marginTop: '0.25rem' }}>
                <strong>Web Development:</strong> HTML5, CSS3, JavaScript, React.js, Responsive Web Design, REST API basics, Fetch/Axios
              </p>
              <p style={{ marginTop: '0.25rem' }}>
                <strong>Databases &amp; Tools:</strong> SQL, MySQL, DBMS, Git, GitHub, VS Code, MS Office
              </p>
              <p style={{ marginTop: '0.25rem' }}>
                <strong>Currently Exploring:</strong> Advanced React, Full-Stack Architecture, Backend Development, AI/ML integration, Cloud deployment
              </p>
            </div>

            {/* Featured Projects */}
            <div className="resume-sec">
              <h2>Key Projects</h2>
              {featuredProjects.map((p) => (
                <div key={p.id} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>{p.title}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0.15rem 0' }}>
                    <strong>Technologies:</strong> {p.technologies.join(', ')}
                  </p>
                  <p style={{ fontSize: '0.82rem', margin: '0.15rem 0' }}>{p.description}</p>
                  <span style={{ fontSize: '0.8rem', color: '#4f46e5' }}>GitHub: {p.github}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="resume-sec">
              <h2>Certifications</h2>
              <ul style={{ paddingLeft: '1.25rem' }}>
                {certificationsData.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>
                    <strong>{c.title}</strong> — {c.issuer} ({c.badge})
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="resume-sec">
              <h2>Key Highlights &amp; Achievements</h2>
              <ul style={{ paddingLeft: '1.25rem' }}>
                {achievementsData.map((a, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>
                    <strong>{a.title}:</strong> {a.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
