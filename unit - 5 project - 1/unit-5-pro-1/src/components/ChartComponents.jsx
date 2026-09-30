import { SUBJECTS } from '../data/storage';

export function SubjectAverageChart({ students }) {
  const studentsWithMarks = students.filter(s => s.metrics && s.metrics.hasMarks);
  
  const subjectAverages = SUBJECTS.map(sub => {
    let sum = 0;
    let count = 0;
    studentsWithMarks.forEach(s => {
      if (s.marks && s.marks[sub.key]) {
        sum += s.marks[sub.key].total;
        count++;
      }
    });
    const avg = count > 0 ? Math.round(sum / count) : 0;
    return { name: sub.name, avg };
  });

  return (
    <div className="chart-wrapper">
      <div className="bar-chart-container">
        {subjectAverages.map((item, idx) => (
          <div key={idx} className="chart-bar-group">
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{
                  height: `${item.avg}%`,
                  background: item.avg >= 85 ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' :
                              item.avg >= 70 ? 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)' :
                              'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                }}
              >
                <span className="bar-tooltip">{item.avg}%</span>
              </div>
            </div>
            <span className="chart-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PassFailDonut({ passed, failed }) {
  const total = passed + failed;
  const passPct = total > 0 ? Math.round((passed / total) * 100) : 0;
  const failPct = total > 0 ? 100 - passPct : 0;

  return (
    <div className="donut-chart-wrap">
      <div className="donut-graphic">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle-pass"
            strokeDasharray={`${passPct}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="donut-inner-text">
          <span className="donut-main-number">{passPct}%</span>
          <span className="donut-sub-text">Passed</span>
        </div>
      </div>

      <div className="chart-legend-box">
        <div className="legend-row">
          <span className="legend-dot pass-dot"></span>
          <span>Passed Students: <strong>{passed}</strong> ({passPct}%)</span>
        </div>
        <div className="legend-row">
          <span className="legend-dot fail-dot"></span>
          <span>Failed Students: <strong>{failed}</strong> ({failPct}%)</span>
        </div>
      </div>
    </div>
  );
}

export function GradeDistributionChart({ students }) {
  const studentsWithMarks = students.filter(s => s.metrics && s.metrics.hasMarks);
  const grades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
  
  const distribution = grades.map(g => {
    const count = studentsWithMarks.filter(s => s.metrics.grade === g).length;
    return { grade: g, count };
  });

  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  return (
    <div className="grade-chart-list">
      {distribution.map(item => (
        <div key={item.grade} className="grade-bar-row">
          <span className={`grade-tag-label grade-${item.grade.replace('+', '-plus')}`}>
            {item.grade}
          </span>
          <div className="grade-track">
            <div
              className="grade-fill"
              style={{
                width: `${(item.count / maxCount) * 100}%`,
                background: item.grade === 'A+' ? '#10b981' :
                            item.grade === 'A' ? '#06b6d4' :
                            item.grade === 'B+' ? '#3b82f6' :
                            item.grade === 'B' ? '#6366f1' :
                            item.grade === 'C' ? '#f59e0b' :
                            item.grade === 'D' ? '#fb923c' : '#ef4444'
              }}
            ></div>
          </div>
          <span className="grade-count-number">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

export function PerformanceComparisonChart({ students }) {
  const studentsWithMarks = students
    .filter(s => s.metrics && s.metrics.hasMarks)
    .slice(0, 8); // Top 8 students

  return (
    <div className="comparison-chart-list">
      {studentsWithMarks.map(s => (
        <div key={s.id} className="comp-row">
          <div className="comp-header">
            <span className="comp-student-name">{s.name} ({s.rollNumber})</span>
            <span className="comp-pct" style={{ color: s.metrics.result === 'PASS' ? '#10b981' : '#ef4444' }}>
              {s.metrics.percentage}% ({s.metrics.grade})
            </span>
          </div>
          <div className="comp-bar-track">
            <div
              className="comp-bar-fill"
              style={{
                width: `${s.metrics.percentage}%`,
                background: s.metrics.result === 'PASS'
                  ? 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)'
                  : 'linear-gradient(90deg, #ef4444 0%, #f43f5e 100%)'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
