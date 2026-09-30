import WeeklyView from '../components/WeeklyView';
import { useTasks } from '../context/TaskContext';

function WeeklyViewPage() {
  const { tasks, weeklyTasks, weeklyCompleted, weeklyCompletionRate } = useTasks();

  // 7-day productivity simulation & data
  const daysData = [
    { day: 'Monday', pct: 80, count: 5 },
    { day: 'Tuesday', pct: 65, count: 4 },
    { day: 'Wednesday', pct: 90, count: 6 },
    { day: 'Thursday', pct: 70, count: 5 },
    { day: 'Friday', pct: 85, count: 6 },
    { day: 'Saturday', pct: 75, count: 3 },
    { day: 'Sunday', pct: 60, count: 2 }
  ];

  return (
    <div className="page-container weekly-view-page">
      <div className="page-header-block">
        <span className="page-meta-badge">TIMELINE OVERVIEW</span>
        <h1 className="page-title">Weekly Schedule &amp; Productivity</h1>
        <p className="page-subtitle">
          Track daily milestones across the full week, balance study workloads, and review your productivity patterns.
        </p>
      </div>

      {/* 7-Day Interactive Planner */}
      <div className="section-block">
        <WeeklyView />
      </div>

      {/* Weekly Productivity & Efficiency Chart */}
      <div className="section-block">
        <div className="productivity-card">
          <div className="productivity-header">
            <div>
              <span className="pill-weekly-tag">Weekly Analytics</span>
              <h3>Productivity &amp; Focus Distribution</h3>
            </div>
            <div className="productivity-kpis">
              <span className="kpi-chip">Completed: <strong>{weeklyCompleted.length}</strong></span>
              <span className="kpi-chip">Total: <strong>{weeklyTasks.length}</strong></span>
              <span className="kpi-chip chip-highlight">Avg Rate: <strong>{weeklyCompletionRate}%</strong></span>
            </div>
          </div>

          <div className="productivity-chart-bars">
            {daysData.map((item) => (
              <div key={item.day} className="prod-bar-col">
                <div className="prod-bar-track">
                  <div
                    className="prod-bar-fill"
                    style={{ height: `${item.pct}%` }}
                  >
                    <span className="prod-tooltip">{item.pct}%</span>
                  </div>
                </div>
                <span className="prod-day-name">{item.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyViewPage;
