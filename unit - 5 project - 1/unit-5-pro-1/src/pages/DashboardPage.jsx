import { Link, useNavigate } from 'react-router-dom';
import { useEdu } from '../context/EduContext';
import {
  SubjectAverageChart,
  PassFailDonut,
  GradeDistributionChart,
  PerformanceComparisonChart
} from '../components/ChartComponents';

function DashboardPage() {
  const { students, stats } = useEdu();
  const navigate = useNavigate();

  // Get recent 5 students
  const recentStudents = students.slice(0, 5);

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Page Title & Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">Analytics &amp; Control Center</span>
            <h1 className="page-main-title">Institution Performance Dashboard</h1>
            <p className="page-subtitle-text">
              Real-time academic evaluation metrics, subject breakdown, and grade distribution directly from local storage.
            </p>
          </div>
          
          {/* Quick Actions in Header */}
          <div className="header-quick-actions">
            <Link to="/add-student" className="btn-primary">
              <span>+</span> Add Student
            </Link>
            <Link to="/marks" className="btn-secondary">
              <span>✏️</span> Enter Marks
            </Link>
          </div>
        </div>

        {/* 6 Statistics Cards */}
        <div className="dashboard-stats-grid">
          <div className="dash-stat-card card-blue">
            <div className="stat-icon-wrap">👨‍🎓</div>
            <div className="stat-data">
              <span className="stat-label">Total Students</span>
              <h3 className="stat-value">{stats.totalStudents}</h3>
              <span className="stat-sub">Enrolled active roster</span>
            </div>
          </div>

          <div className="dash-stat-card card-green">
            <div className="stat-icon-wrap">✅</div>
            <div className="stat-data">
              <span className="stat-label">Passed Students</span>
              <h3 className="stat-value">{stats.passedStudents}</h3>
              <span className="stat-sub">Met pass cutoff (≥40%)</span>
            </div>
          </div>

          <div className="dash-stat-card card-red">
            <div className="stat-icon-wrap">⚠️</div>
            <div className="stat-data">
              <span className="stat-label">Failed Students</span>
              <h3 className="stat-value">{stats.failedStudents}</h3>
              <span className="stat-sub">Needs academic remediation</span>
            </div>
          </div>

          <div className="dash-stat-card card-purple">
            <div className="stat-icon-wrap">📊</div>
            <div className="stat-data">
              <span className="stat-label">Average Percentage</span>
              <h3 className="stat-value">{stats.avgPercentage}%</h3>
              <span className="stat-sub">Institution-wide aggregate</span>
            </div>
          </div>

          <div className="dash-stat-card card-amber">
            <div className="stat-icon-wrap">🏆</div>
            <div className="stat-data">
              <span className="stat-label">Highest Mark</span>
              <h3 className="stat-value">{stats.highestMark} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 600</span></h3>
              <span className="stat-sub">Top scorer ({stats.highestPercentage}%)</span>
            </div>
          </div>

          <div className="dash-stat-card card-teal">
            <div className="stat-icon-wrap">📚</div>
            <div className="stat-data">
              <span className="stat-label">Total Subjects</span>
              <h3 className="stat-value">{stats.totalSubjects}</h3>
              <span className="stat-sub">Tamil to Comp. Science</span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons Row */}
        <div className="quick-actions-bar">
          <span className="quick-actions-title">⚡ Quick Management Actions:</span>
          <div className="quick-action-buttons">
            <Link to="/add-student" className="btn-quick-action">
              <span>👤</span> Add Student
            </Link>
            <Link to="/marks" className="btn-quick-action">
              <span>📝</span> Enter Marks
            </Link>
            <Link to="/students" className="btn-quick-action">
              <span>👥</span> View Students
            </Link>
            <Link to="/reports" className="btn-quick-action">
              <span>📑</span> Generate Report
            </Link>
          </div>
        </div>

        {/* 4 Performance Charts Grid */}
        <div className="dashboard-charts-grid">
          {/* Chart 1: Subject-wise average marks */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Subject-Wise Average Marks</h3>
              <span className="chart-sub-tag">Out of 100 Marks</span>
            </div>
            <p className="chart-card-desc">Comparative analysis across the 6 mandatory academic subjects.</p>
            <SubjectAverageChart students={students} />
          </div>

          {/* Chart 2: Pass vs Fail Ratio */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Pass vs Fail Distribution</h3>
              <span className="chart-sub-tag">Result Ratio</span>
            </div>
            <p className="chart-card-desc">Percentage of students clearing all subjects successfully.</p>
            <PassFailDonut passed={stats.passedStudents} failed={stats.failedStudents} />
          </div>

          {/* Chart 3: Grade Distribution */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Grade Distribution (A+ to F)</h3>
              <span className="chart-sub-tag">Academic Tiers</span>
            </div>
            <p className="chart-card-desc">Distribution of students based on final evaluated grade bands.</p>
            <GradeDistributionChart students={students} />
          </div>

          {/* Chart 4: Student Performance Comparison */}
          <div className="dash-chart-card">
            <div className="chart-card-header">
              <h3>Student Performance Benchmarks</h3>
              <span className="chart-sub-tag">Top Performers</span>
            </div>
            <p className="chart-card-desc">Top ranked students by computed aggregate percentage.</p>
            <PerformanceComparisonChart students={students} />
          </div>
        </div>

        {/* Recent Students Table Section */}
        <div className="dash-table-card">
          <div className="table-card-header">
            <div>
              <h3>Recent Student Records</h3>
              <p>Latest enrolled students and their evaluated academic status.</p>
            </div>
            <Link to="/students" className="view-all-link">
              View All Students ({students.length}) &rarr;
            </Link>
          </div>

          <div className="table-responsive">
            <table className="edu-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Result</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id}>
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
                      <strong>
                        {s.metrics && s.metrics.hasMarks ? `${s.metrics.percentage}%` : '—'}
                      </strong>
                    </td>
                    <td>
                      <span className={`grade-tag grade-${s.metrics && s.metrics.grade ? s.metrics.grade.replace('+', '-plus') : 'na'}`}>
                        {s.metrics && s.metrics.grade ? s.metrics.grade : 'N/A'}
                      </span>
                    </td>
                    <td>
                      {s.metrics && s.metrics.hasMarks ? (
                        <span className={`status-pill ${s.metrics.result === 'PASS' ? 'pill-pass' : 'pill-fail'}`}>
                          {s.metrics.result}
                        </span>
                      ) : (
                        <span className="status-pill pill-pending">Pending</span>
                      )}
                    </td>
                    <td>
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

export default DashboardPage;
