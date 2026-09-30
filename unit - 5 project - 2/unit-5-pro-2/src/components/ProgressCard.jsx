import { useTasks } from '../context/TaskContext';

function ProgressCard() {
  const { todayTasks, todayCompleted, todayPending, todayInProgress, todayProgressPercent } = useTasks();

  return (
    <div className="progress-summary-card">
      <div className="progress-card-header">
        <div className="progress-title-meta">
          <span className="progress-badge">Live Metric</span>
          <h3>Today's Progress</h3>
        </div>
        <div className="progress-percentage-display">
          <span className="percent-number">{todayProgressPercent}%</span>
          <span className="percent-label">Completed</span>
        </div>
      </div>

      {/* Animated Visual Progress Bar */}
      <div className="progress-track-wrapper">
        <div
          className="progress-fill-bar"
          style={{ width: `${todayProgressPercent}%` }}
        ></div>
      </div>

      {/* Progress Breakdown Counters */}
      <div className="progress-stats-row">
        <div className="stat-pill-item item-completed">
          <span className="pill-dot"></span>
          <span className="stat-pill-num">{todayCompleted.length}</span>
          <span className="stat-pill-lbl">Completed</span>
        </div>

        <div className="stat-pill-item item-inprogress">
          <span className="pill-dot"></span>
          <span className="stat-pill-num">{todayInProgress.length}</span>
          <span className="stat-pill-lbl">In Progress</span>
        </div>

        <div className="stat-pill-item item-pending">
          <span className="pill-dot"></span>
          <span className="stat-pill-num">{todayPending.length}</span>
          <span className="stat-pill-lbl">Pending</span>
        </div>

        <div className="stat-pill-item item-total">
          <span className="pill-dot"></span>
          <span className="stat-pill-num">{todayTasks.length}</span>
          <span className="stat-pill-lbl">Total Tasks</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
