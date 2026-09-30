import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEdu } from '../context/EduContext';
import {
  SubjectAverageChart,
  PassFailDonut,
  GradeDistributionChart,
  PerformanceComparisonChart
} from '../components/ChartComponents';

function ResultsPage() {
  const { students } = useEdu();
  const navigate = useNavigate();

  // Filters
  const [classFilter, setClassFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');

  // Filter students who have marks
  const studentsWithMarks = useMemo(() => {
    return students.filter(s => s.metrics && s.metrics.hasMarks);
  }, [students]);

  // Apply Class, Section, Academic Year filters
  const filteredStudents = useMemo(() => {
    return studentsWithMarks.filter((s) => {
      const matchClass = classFilter === 'ALL' || s.className === classFilter;
      const matchSection = sectionFilter === 'ALL' || s.section === sectionFilter;
      const matchYear = yearFilter === 'ALL' || s.academicYear === yearFilter;
      return matchClass && matchSection && matchYear;
    });
  }, [studentsWithMarks, classFilter, sectionFilter, yearFilter]);

  // Dynamic Overall Statistics based on filtered set
  const stats = useMemo(() => {
    if (filteredStudents.length === 0) {
      return {
        highestPct: 0,
        lowestPct: 0,
        avgPct: '0.00',
        totalPassed: 0,
        totalFailed: 0,
        total: 0
      };
    }

    const percentages = filteredStudents.map(s => s.metrics.percentage);
    const highestPct = Math.max(...percentages);
    const lowestPct = Math.min(...percentages);
    const sumPct = percentages.reduce((acc, p) => acc + p, 0);
    const avgPct = (sumPct / filteredStudents.length).toFixed(2);
    const totalPassed = filteredStudents.filter(s => s.metrics.result === 'PASS').length;
    const totalFailed = filteredStudents.filter(s => s.metrics.result === 'FAIL').length;

    return {
      highestPct,
      lowestPct,
      avgPct,
      totalPassed,
      totalFailed,
      total: filteredStudents.length
    };
  }, [filteredStudents]);

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">Institutional Insights</span>
            <h1 className="page-main-title">Results &amp; Performance Analysis</h1>
            <p className="page-subtitle-text">
              Comprehensive cohort analytics, grade distribution, subject averages, and merit rank tables powered by live student data.
            </p>
          </div>

          <div className="header-quick-actions">
            <Link to="/reports" className="btn-secondary">
              <span>📑</span> View Report Cards
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-card">
          <div className="filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="filter-field">
              <label>Filter by Class</label>
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

            <div className="filter-field">
              <label>Filter by Section</label>
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

            <div className="filter-field">
              <label>Filter by Academic Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Academic Years</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>
          </div>

          <div className="filter-summary-row">
            <span>Analyzing <strong>{filteredStudents.length}</strong> evaluated student records</span>
            {(classFilter !== 'ALL' || sectionFilter !== 'ALL' || yearFilter !== 'ALL') && (
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setClassFilter('ALL');
                  setSectionFilter('ALL');
                  setYearFilter('ALL');
                }}
              >
                Reset Filters ↻
              </button>
            )}
          </div>
        </div>

        {/* Overall Statistics Cards */}
        <div className="dashboard-stats-grid" style={{ marginTop: '1.5rem' }}>
          <div className="dash-stat-card card-amber">
            <div className="stat-icon-wrap">🥇</div>
            <div className="stat-data">
              <span className="stat-label">Highest Percentage</span>
              <h3 className="stat-value">{stats.highestPct}%</h3>
              <span className="stat-sub">Top cohort milestone</span>
            </div>
          </div>

          <div className="dash-stat-card card-teal">
            <div className="stat-icon-wrap">📉</div>
            <div className="stat-data">
              <span className="stat-label">Lowest Percentage</span>
              <h3 className="stat-value">{stats.lowestPct}%</h3>
              <span className="stat-sub">Remedial attention floor</span>
            </div>
          </div>

          <div className="dash-stat-card card-purple">
            <div className="stat-icon-wrap">📊</div>
            <div className="stat-data">
              <span className="stat-label">Average Percentage</span>
              <h3 className="stat-value">{stats.avgPct}%</h3>
              <span className="stat-sub">Selected cohort mean</span>
            </div>
          </div>

          <div className="dash-stat-card card-green">
            <div className="stat-icon-wrap">✅</div>
            <div className="stat-data">
              <span className="stat-label">Total Passed</span>
              <h3 className="stat-value">{stats.totalPassed}</h3>
              <span className="stat-sub">Cleared all subjects</span>
            </div>
          </div>

          <div className="dash-stat-card card-red">
            <div className="stat-icon-wrap">⚠️</div>
            <div className="stat-data">
              <span className="stat-label">Total Failed</span>
              <h3 className="stat-value">{stats.totalFailed}</h3>
              <span className="stat-sub">Arrears / below pass mark</span>
            </div>
          </div>
        </div>

        {/* Performance Charts (4 required) */}
        <div className="dashboard-charts-grid" style={{ marginTop: '2rem' }}>
          {/* Chart 1: Subject-wise Performance */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Subject-Wise Performance</h3>
              <span className="chart-sub-tag">Average Scores</span>
            </div>
            <p className="chart-card-desc">Mean performance across Tamil, English, Math, Physics, Chemistry, and CS.</p>
            <SubjectAverageChart students={filteredStudents} />
          </div>

          {/* Chart 2: Grade Distribution */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Grade Distribution</h3>
              <span className="chart-sub-tag">A+ Through F</span>
            </div>
            <p className="chart-card-desc">Student volume across each academic grading band.</p>
            <GradeDistributionChart students={filteredStudents} />
          </div>

          {/* Chart 3: Pass vs Fail */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Pass vs Fail Ratio</h3>
              <span className="chart-sub-tag">Cohort Ratio</span>
            </div>
            <p className="chart-card-desc">Proportion of passed students vs students requiring re-examination.</p>
            <PassFailDonut passed={stats.totalPassed} failed={stats.totalFailed} />
          </div>

          {/* Chart 4: Student Percentage Comparison */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Student Percentage Comparison</h3>
              <span className="chart-sub-tag">Merit Standings</span>
            </div>
            <p className="chart-card-desc">Individual percentage benchmarking of top ranked performers.</p>
            <PerformanceComparisonChart students={filteredStudents} />
          </div>
        </div>

        {/* Student Results Table (Ranked) */}
        <div className="dash-table-card" style={{ marginTop: '2rem' }}>
          <div className="table-card-header">
            <div>
              <h3>Official Student Results &amp; Merit Table</h3>
              <p>Ranked standings ordered by aggregate percentage and pass status.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="btn-secondary"
            >
              🖨️ Print Results Table
            </button>
          </div>

          <div className="table-responsive">
            <table className="edu-table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>Rank</th>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Result</th>
                  <th style={{ textAlign: 'center' }}>Report Card</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, idx) => (
                  <tr key={s.id}>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`rank-badge ${idx === 0 ? 'rank-gold' : idx === 1 ? 'rank-silver' : idx === 2 ? 'rank-bronze' : ''}`}>
                        #{s.rank || idx + 1}
                      </span>
                    </td>
                    <td><span className="code-badge">{s.rollNumber}</span></td>
                    <td>
                      <div className="student-name-cell">
                        <div className="avatar-circle">{s.name.charAt(0)}</div>
                        <div>
                          <strong>{s.name}</strong>
                          <span className="small-dept">{s.department}</span>
                        </div>
                      </div>
                    </td>
                    <td>{s.className} ({s.section})</td>
                    <td>
                      <strong>{s.metrics.totalMarks}</strong> <span style={{ color: 'var(--text-muted)' }}>/ {s.metrics.maxMarks}</span>
                    </td>
                    <td>
                      <strong className="text-primary">{s.metrics.percentage}%</strong>
                    </td>
                    <td>
                      <span className={`grade-tag grade-${s.metrics.grade.replace('+', '-plus')}`}>
                        {s.metrics.grade}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${s.metrics.result === 'PASS' ? 'pill-pass' : 'pill-fail'}`}>
                        {s.metrics.result}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn-table-action"
                        onClick={() => navigate(`/report/${s.id}`)}
                      >
                        📄 View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
