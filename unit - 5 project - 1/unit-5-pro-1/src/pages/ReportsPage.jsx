import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEdu } from '../context/EduContext';

function ReportsPage() {
  const { students } = useEdu();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [resultFilter, setResultFilter] = useState('ALL');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  // Filter only students who have marks entered
  const studentsWithMarks = useMemo(() => {
    return students.filter(s => s.metrics && s.metrics.hasMarks);
  }, [students]);

  // Apply filters and search
  const filteredReports = useMemo(() => {
    return studentsWithMarks.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNumber.toLowerCase().includes(q);

      const matchClass = classFilter === 'ALL' || s.className === classFilter;
      const matchSection = sectionFilter === 'ALL' || s.section === sectionFilter;
      const matchYear = yearFilter === 'ALL' || s.academicYear === yearFilter;
      const matchResult = resultFilter === 'ALL' || s.metrics.result === resultFilter;
      const matchGrade = gradeFilter === 'ALL' || s.metrics.grade === gradeFilter;

      return matchSearch && matchClass && matchSection && matchYear && matchResult && matchGrade;
    });
  }, [studentsWithMarks, searchTerm, classFilter, sectionFilter, yearFilter, resultFilter, gradeFilter]);

  // Handle Quick Print / PDF for a card
  const handleQuickPrint = (studentId) => {
    navigate(`/report/${studentId}?print=true`);
  };

  const handleDownloadPDF = (studentName, rollNumber) => {
    // Triggers standard printable PDF dialog by navigating or triggering window print
    window.print();
  };

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <div className="flex-align-center gap-2">
              <span className="page-category-badge">Academic Transcripts</span>
              <span className="count-pill">{filteredReports.length} Evaluated Reports</span>
            </div>
            <h1 className="page-main-title">Student Report Cards Directory</h1>
            <p className="page-subtitle-text">
              Browse, inspect, print, or export official semester grade cards for students with submitted assessment marks.
            </p>
          </div>

          <div className="header-quick-actions">
            <Link to="/marks" className="btn-secondary">
              <span>✏️</span> Enter More Marks
            </Link>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="filter-card">
          <div className="filter-grid report-filter-grid">
            {/* Search Input */}
            <div className="filter-field search-field">
              <label>Search by Student Name or Roll Number</label>
              <div className="input-with-icon">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="e.g. Nishanth or 23CSE042..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
                {searchTerm && (
                  <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
                )}
              </div>
            </div>

            {/* Class Filter */}
            <div className="filter-field">
              <label>Class</label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Classes</option>
                <option value="1st Year B.E.">1st Year B.E.</option>
                <option value="2nd Year B.E.">2nd Year B.E.</option>
                <option value="3rd Year B.E.">3rd Year B.E.</option>
                <option value="4th Year B.E.">4th Year B.E.</option>
              </select>
            </div>

            {/* Section Filter */}
            <div className="filter-field">
              <label>Section</label>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            {/* Academic Year */}
            <div className="filter-field">
              <label>Academic Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Years</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>

            {/* Result Filter */}
            <div className="filter-field">
              <label>Result</label>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Results</option>
                <option value="PASS">PASS Only</option>
                <option value="FAIL">FAIL Only</option>
              </select>
            </div>

            {/* Grade Filter */}
            <div className="filter-field">
              <label>Grade</label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Grades</option>
                <option value="A+">Grade A+ (90-100%)</option>
                <option value="A">Grade A (80-89%)</option>
                <option value="B+">Grade B+ (70-79%)</option>
                <option value="B">Grade B (60-69%)</option>
                <option value="C">Grade C (50-59%)</option>
                <option value="D">Grade D (40-49%)</option>
                <option value="F">Grade F (Below 40%)</option>
              </select>
            </div>
          </div>

          <div className="filter-summary-row">
            <span>Showing <strong>{filteredReports.length}</strong> of {studentsWithMarks.length} evaluated student cards</span>
            {(searchTerm || classFilter !== 'ALL' || sectionFilter !== 'ALL' || yearFilter !== 'ALL' || resultFilter !== 'ALL' || gradeFilter !== 'ALL') && (
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setClassFilter('ALL');
                  setSectionFilter('ALL');
                  setYearFilter('ALL');
                  setResultFilter('ALL');
                  setGradeFilter('ALL');
                }}
              >
                Reset Filters ↻
              </button>
            )}
          </div>
        </div>

        {/* Report Cards Grid */}
        {filteredReports.length === 0 ? (
          <div className="empty-state-box" style={{ marginTop: '2rem' }}>
            <div className="empty-icon">📑</div>
            <h3>No Report Cards Found</h3>
            <p>No evaluated students match your selected filters. Either adjust your filters or visit Marks Entry to record student grades.</p>
            <Link to="/marks" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Go to Marks Entry
            </Link>
          </div>
        ) : (
          <div className="report-cards-grid">
            {filteredReports.map((s) => (
              <div key={s.id} className="report-card-item">
                <div className="report-card-header">
                  <div className="card-badge-row">
                    <span className="card-roll-badge">{s.rollNumber}</span>
                    <span className={`status-pill ${s.metrics.result === 'PASS' ? 'pill-pass' : 'pill-fail'}`}>
                      {s.metrics.result}
                    </span>
                  </div>

                  <div className="card-student-info">
                    <div className="card-avatar">{s.name.charAt(0)}</div>
                    <div>
                      <h3 className="card-student-name">{s.name}</h3>
                      <p className="card-class-desc">{s.className} • Sec {s.section}</p>
                    </div>
                  </div>
                </div>

                <div className="report-card-body">
                  <div className="card-stats-row">
                    <div className="card-stat">
                      <span className="card-stat-label">Percentage</span>
                      <span className="card-stat-val text-primary">{s.metrics.percentage}%</span>
                    </div>

                    <div className="card-stat">
                      <span className="card-stat-label">Grade</span>
                      <span className={`grade-tag grade-${s.metrics.grade.replace('+', '-plus')}`}>
                        {s.metrics.grade}
                      </span>
                    </div>

                    <div className="card-stat">
                      <span className="card-stat-label">Class Rank</span>
                      <span className="card-stat-val">#{s.rank}</span>
                    </div>
                  </div>

                  <div className="card-mini-bar">
                    <div
                      className="card-mini-bar-fill"
                      style={{
                        width: `${s.metrics.percentage}%`,
                        background: s.metrics.result === 'PASS'
                          ? 'linear-gradient(90deg, #3b82f6, #10b981)'
                          : 'linear-gradient(90deg, #f59e0b, #ef4444)'
                      }}
                    ></div>
                  </div>
                  <div className="card-marks-aggregate">
                    <span>Total: <strong>{s.metrics.totalMarks}</strong> / {s.metrics.maxMarks}</span>
                    <span>Avg: <strong>{s.metrics.average}</strong></span>
                  </div>
                </div>

                {/* 3 Buttons: View Report, Print, Download PDF */}
                <div className="report-card-actions">
                  <button
                    className="btn-card-view"
                    onClick={() => navigate(`/report/${s.id}`)}
                  >
                    👁️ View Report
                  </button>

                  <button
                    className="btn-card-print"
                    onClick={() => navigate(`/report/${s.id}`)}
                    title="Print Official Report Card"
                  >
                    🖨️ Print
                  </button>

                  <button
                    className="btn-card-pdf"
                    onClick={() => navigate(`/report/${s.id}`)}
                    title="Download Official PDF"
                  >
                    📥 PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
