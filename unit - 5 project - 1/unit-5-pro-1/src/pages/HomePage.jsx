import { Link } from 'react-router-dom';
import { useEdu } from '../context/EduContext';

function HomePage() {
  const { stats, students } = useEdu();

  const features = [
    {
      icon: '👥',
      title: 'Student Management',
      desc: 'Seamlessly register, edit, search, and manage comprehensive student profiles and academic records.'
    },
    {
      icon: '📝',
      title: 'Marks Management',
      desc: 'Flexible marks entry for Internal, Assignment, Practical, and Theory assessments across all subjects.'
    },
    {
      icon: '⚡',
      title: 'Automatic Grade Calculation',
      desc: 'Instant calculation of subject totals, GPA, percentage, overall grade (A+ to F), and strict pass/fail criteria.'
    },
    {
      icon: '📄',
      title: 'Report Card Generation',
      desc: 'Generate, preview, and print official institutional grade cards with signatures and verified transcripts.'
    },
    {
      icon: '📊',
      title: 'Performance Analytics',
      desc: 'Visual distribution charts, subject-wise averages, class rank benchmarking, and deep pass/fail insights.'
    }
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="edu-container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-indicator"></span>
              <span>Next-Gen Academic Reporting Suite</span>
            </div>
            <h1 className="hero-title">
              Student Report Card <br />
              <span className="gradient-text">Management System</span>
            </h1>
            <p className="hero-description">
              EduReport empowers educational institutions, teachers, and administrators to streamline 
              student enrollment, track multi-component subject marks, compute grades automatically, 
              and generate beautiful, print-ready report cards in seconds.
            </p>
            <div className="hero-cta-group">
              <Link to="/dashboard" className="btn-primary-large">
                Get Started <span>&rarr;</span>
              </Link>
              <Link to="/reports" className="btn-outline-large">
                View Reports <span>📑</span>
              </Link>
            </div>
            <div className="hero-meta-strip">
              <div className="hero-meta-item">
                <strong>100%</strong>
                <span>Automated Grading</span>
              </div>
              <div className="hero-meta-divider"></div>
              <div className="hero-meta-item">
                <strong>Instant</strong>
                <span>PDF / Print Ready</span>
              </div>
              <div className="hero-meta-divider"></div>
              <div className="hero-meta-item">
                <strong>Dynamic</strong>
                <span>LocalStorage Sync</span>
              </div>
            </div>
          </div>

          <div className="hero-illustration-col">
            <div className="illustration-card-stack">
              <div className="floating-stat-badge stat-badge-top">
                <span className="badge-icon">🏆</span>
                <div>
                  <span className="badge-num">{stats.avgPercentage}%</span>
                  <span className="badge-lbl">Class Average</span>
                </div>
              </div>

              {/* Vector / SVG Education Dashboard Mockup Illustration */}
              <div className="hero-vector-art">
                <svg viewBox="0 0 500 400" className="hero-svg">
                  <defs>
                    <linearGradient id="gradBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.98" />
                    </linearGradient>
                    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#1e293b" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Outer Frame */}
                  <rect x="20" y="20" width="460" height="350" rx="20" fill="url(#gradBg)" opacity="0.15" />
                  
                  {/* Main Dashboard Window */}
                  <rect x="40" y="40" width="420" height="320" rx="16" fill="url(#cardGrad)" filter="url(#cardShadow)" />
                  
                  {/* Top Bar */}
                  <rect x="40" y="40" width="420" height="42" rx="16" fill="#1e293b" />
                  <circle cx="65" cy="61" r="5" fill="#ef4444" />
                  <circle cx="82" cy="61" r="5" fill="#f59e0b" />
                  <circle cx="99" cy="61" r="5" fill="#10b981" />
                  <rect x="130" y="52" width="180" height="18" rx="9" fill="#334155" />
                  <text x="220" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">EduReport Portal v2.0</text>

                  {/* Student Card Widget */}
                  <rect x="60" y="100" width="170" height="90" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <circle cx="95" cy="135" r="20" fill="#3b82f6" />
                  <text x="95" y="141" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">🎓</text>
                  <text x="130" y="130" fill="#1e293b" fontSize="12" fontWeight="bold">Nishanth M S</text>
                  <text x="130" y="146" fill="#64748b" fontSize="10">23CSE042 • B.E.</text>
                  <rect x="130" y="154" width="80" height="16" rx="8" fill="#dcfce7" />
                  <text x="170" y="166" fill="#15803d" fontSize="9" fontWeight="bold" textAnchor="middle">Grade: A+ (PASS)</text>

                  {/* Performance Chart Widget */}
                  <rect x="250" y="100" width="190" height="90" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
                  <text x="265" y="122" fill="#581c87" fontSize="11" fontWeight="bold">Marks Distribution</text>
                  <rect x="265" y="150" width="14" height="25" rx="3" fill="#8b5cf6" />
                  <rect x="290" y="138" width="14" height="37" rx="3" fill="#6366f1" />
                  <rect x="315" y="130" width="14" height="45" rx="3" fill="#3b82f6" />
                  <rect x="340" y="142" width="14" height="33" rx="3" fill="#06b6d4" />
                  <rect x="365" y="135" width="14" height="40" rx="3" fill="#10b981" />
                  <rect x="390" y="148" width="14" height="27" rx="3" fill="#a855f7" />

                  {/* Report Card Preview Strip */}
                  <rect x="60" y="205" width="380" height="135" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  <rect x="80" y="222" width="160" height="12" rx="4" fill="#e2e8f0" />
                  <rect x="80" y="242" width="340" height="20" rx="4" fill="#f8fafc" />
                  <text x="90" y="256" fill="#475569" fontSize="10">Subject</text>
                  <text x="210" y="256" fill="#475569" fontSize="10">Total / 100</text>
                  <text x="310" y="256" fill="#475569" fontSize="10">Grade</text>
                  <text x="380" y="256" fill="#475569" fontSize="10">Status</text>

                  {/* Row 1 */}
                  <text x="90" y="282" fill="#0f172a" fontSize="10" fontWeight="600">Mathematics</text>
                  <text x="220" y="282" fill="#0f172a" fontSize="10">98 / 100</text>
                  <text x="320" y="282" fill="#15803d" fontSize="10" fontWeight="bold">A+</text>
                  <text x="385" y="282" fill="#15803d" fontSize="10" fontWeight="bold">PASS</text>
                  <line x1="80" y1="293" x2="420" y2="293" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Row 2 */}
                  <text x="90" y="315" fill="#0f172a" fontSize="10" fontWeight="600">Computer Science</text>
                  <text x="220" y="315" fill="#0f172a" fontSize="10">99 / 100</text>
                  <text x="320" y="315" fill="#15803d" fontSize="10" fontWeight="bold">A+</text>
                  <text x="385" y="315" fill="#15803d" fontSize="10" fontWeight="bold">PASS</text>
                </svg>
              </div>

              <div className="floating-stat-badge stat-badge-bottom">
                <span className="badge-icon">✅</span>
                <div>
                  <span className="badge-num">{stats.passedStudents} / {stats.totalStudents}</span>
                  <span className="badge-lbl">Passed Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="edu-container">
          <div className="stats-grid">
            <div className="stat-counter-card">
              <div className="stat-card-icon icon-blue">👨‍🎓</div>
              <div className="stat-card-info">
                <span className="stat-number">{stats.totalStudents}</span>
                <span className="stat-name">Total Students</span>
              </div>
            </div>

            <div className="stat-counter-card">
              <div className="stat-card-icon icon-purple">📚</div>
              <div className="stat-card-info">
                <span className="stat-number">{stats.totalSubjects}</span>
                <span className="stat-name">Total Subjects</span>
              </div>
            </div>

            <div className="stat-counter-card">
              <div className="stat-card-icon icon-green">🎯</div>
              <div className="stat-card-info">
                <span className="stat-number">{stats.passedStudents}</span>
                <span className="stat-name">Passed Students</span>
              </div>
            </div>

            <div className="stat-counter-card">
              <div className="stat-card-icon icon-orange">📈</div>
              <div className="stat-card-info">
                <span className="stat-number">{stats.avgPercentage}%</span>
                <span className="stat-name">Average Percentage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="edu-container">
          <div className="section-header-center">
            <span className="section-pill">Core Capabilities</span>
            <h2 className="section-title">Designed for Modern Educational Excellence</h2>
            <p className="section-subtitle">
              Everything institutional educators need to handle grading, student profiles, and report cards with total precision.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-box">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
                <div className="feature-hover-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Launch Banner */}
      <section className="cta-banner-section">
        <div className="edu-container">
          <div className="cta-banner-card">
            <div className="cta-text">
              <h2>Ready to evaluate or generate student report cards?</h2>
              <p>Access the full student roster, enter marks for all 6 subjects, or review analytics instantly.</p>
            </div>
            <div className="cta-actions">
              <Link to="/students" className="btn-banner-white">
                View All Students
              </Link>
              <Link to="/marks" className="btn-banner-trans">
                Enter Marks Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
