import { Link } from 'react-router-dom';

function AboutPage() {
  const gradingRules = [
    { grade: 'A+', range: '90 - 100%', points: '10.0', desc: 'Outstanding Academic Performance' },
    { grade: 'A', range: '80 - 89%', points: '9.0', desc: 'Excellent Mastery of Subjects' },
    { grade: 'B+', range: '70 - 79%', points: '8.0', desc: 'Very Good Academic Standing' },
    { grade: 'B', range: '60 - 69%', points: '7.0', desc: 'Good Standard Performance' },
    { grade: 'C', range: '50 - 59%', points: '6.0', desc: 'Average Performance' },
    { grade: 'D', range: '40 - 49%', points: '5.0', desc: 'Pass Cutoff Threshold' },
    { grade: 'F', range: 'Below 40%', points: '0.0', desc: 'Reappearance Required (FAIL)' }
  ];

  const assessmentComponents = [
    { name: 'Internal Assessment', max: 20, desc: 'Mid-term continuous evaluations and classroom tests.' },
    { name: 'Assignment & Seminar', max: 10, desc: 'Technical problem sets, presentations, and tutorials.' },
    { name: 'Laboratory Practical', max: 20, desc: 'Hands-on practical execution and viva-voce.' },
    { name: 'Semester End Theory', max: 50, desc: 'Comprehensive final written examination.' }
  ];

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">System Documentation</span>
            <h1 className="page-main-title">About EduReport Management System</h1>
            <p className="page-subtitle-text">
              Engineered for academic integrity, automated marks compilation, and instant verifiable transcript generation.
            </p>
          </div>
          <Link to="/dashboard" className="btn-primary">
            Explore Dashboard &rarr;
          </Link>
        </div>

        {/* Institution Highlights Card */}
        <div className="dash-table-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div className="about-hero-grid">
            <div className="about-text-col">
              <span className="section-pill">ACADEMIC FOUNDATION</span>
              <h2 style={{ fontSize: '1.75rem', margin: '0.8rem 0 1rem' }}>
                Prince Dr. K. Vasudevan College of Engineering &amp; Technology
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                EduReport is developed as an institutional academic suite for PDKVCET Chennai. 
                It replaces manual grading registers and fragmented spreadsheets with a synchronized, 
                error-free client-side application that handles every phase of student assessment.
              </p>
              <div className="about-stats-pills">
                <span className="footer-pill">Anna University Syllabus Aligned</span>
                <span className="footer-pill">AICTE Criteria Compliant</span>
                <span className="footer-pill">6 Core Engineering Subjects</span>
                <span className="footer-pill">React 19 &bull; Vite &bull; LocalStorage</span>
              </div>
            </div>

            <div className="about-seal-card">
              <div className="inst-crest-large">🏛️</div>
              <h3>PDKVCET Chennai</h3>
              <p>Department of Computer Science &amp; Engineering</p>
              <span className="code-badge" style={{ marginTop: '0.5rem' }}>Unit 5 Project 1</span>
            </div>
          </div>
        </div>

        {/* Evaluation Scheme & Grading Table */}
        <div className="dashboard-charts-grid" style={{ marginBottom: '2rem' }}>
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Four-Tier Assessment Breakdown</h3>
              <span className="chart-sub-tag">Total = 100 Marks</span>
            </div>
            <p className="chart-card-desc">Every subject is evaluated across four distinct examination components:</p>

            <div className="assessment-cards-list">
              {assessmentComponents.map((item, idx) => (
                <div key={idx} className="comp-item-row">
                  <div>
                    <strong>{item.name}</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{item.desc}</p>
                  </div>
                  <span className="mark-badge-comp">{item.max} Marks</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Institutional Grading Scale</h3>
              <span className="chart-sub-tag">Standard Schema</span>
            </div>
            <p className="chart-card-desc">Automatic letter grade mapping based on percentage and pass criteria:</p>

            <div className="table-responsive">
              <table className="edu-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Percentage Range</th>
                    <th>Grade Points</th>
                    <th>Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {gradingRules.map((rule) => (
                    <tr key={rule.grade}>
                      <td>
                        <span className={`grade-tag grade-${rule.grade.replace('+', '-plus')}`}>
                          {rule.grade}
                        </span>
                      </td>
                      <td><strong>{rule.range}</strong></td>
                      <td>{rule.points}</td>
                      <td>{rule.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Automatic Failure Policy Note */}
        <div className="alert-banner alert-error" style={{ marginBottom: '2rem' }}>
          <span className="alert-icon">⚖️</span>
          <div>
            <strong>Strict Academic Pass Policy:</strong>
            <p>
              To attain an overall <strong>PASS</strong> status, a candidate must secure a minimum aggregate of 40 marks in each of the 6 subjects. If any individual subject mark drops below 40, the system automatically mandates an overall <strong>FAIL</strong> classification, prompting academic remediation.
            </p>
          </div>
        </div>

        {/* Technology Architecture Section */}
        <div className="dash-table-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Technical Architecture &amp; Stack</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            EduReport is built using high-performance modern web standards ensuring complete privacy, zero server-latency, and offline availability.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">⚛️</div>
              <h3 className="feature-title">React 19</h3>
              <p className="feature-desc">Component-driven reactive state architecture with hooks and clean modular page components.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">🧭</div>
              <h3 className="feature-title">React Router v7</h3>
              <p className="feature-desc">Dynamic route parameters (`/report/:id`), responsive navigation bar, and tab management.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">💾</div>
              <h3 className="feature-title">LocalStorage Sync</h3>
              <p className="feature-desc">Client-side persistence layer with real-time CRUD and seed records for immediate out-of-the-box exploration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">🖨️</div>
              <h3 className="feature-title">Print Media CSS</h3>
              <p className="feature-desc">Specialized `@media print` style system formatting high-resolution, watermark-ready official transcripts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
