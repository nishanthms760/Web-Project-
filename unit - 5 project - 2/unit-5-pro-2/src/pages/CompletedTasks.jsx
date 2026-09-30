import { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import EmptyState from '../components/EmptyState';

function CompletedTasks() {
  const { tasks, toggleComplete, removeTask, currentDate } = useTasks();

  // All completed tasks
  const completedTasks = useMemo(() => {
    return tasks.filter(t => t.status === 'Completed');
  }, [tasks]);

  // Today's completed
  const todayCompleted = useMemo(() => {
    return completedTasks.filter(t => t.date === currentDate);
  }, [completedTasks, currentDate]);

  // Weekly completed (within last 7 days)
  const weeklyCompleted = useMemo(() => {
    return completedTasks.filter(t => {
      const diffDays = Math.abs(new Date(currentDate) - new Date(t.date)) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    });
  }, [completedTasks, currentDate]);

  // Monthly completed (within current month e.g. 2026-09)
  const monthlyCompleted = useMemo(() => {
    const monthPrefix = currentDate.slice(0, 7);
    return completedTasks.filter(t => (t.date || '').startsWith(monthPrefix));
  }, [completedTasks, currentDate]);

  return (
    <div className="page-container completed-tasks-page">
      {/* Celebration Banner */}
      <div className="celebration-banner-card">
        <div className="celebration-icon">🎉</div>
        <div className="celebration-text">
          <h2>You completed {weeklyCompleted.length} tasks this week!</h2>
          <p>Outstanding consistency! Review your finished study sessions and track your academic wins.</p>
        </div>
      </div>

      {/* 3 Summary Breakdown Cards */}
      <div className="completed-stats-grid">
        <div className="completed-stat-card card-green">
          <span className="stat-label">Today's Completed</span>
          <span className="stat-num">{todayCompleted.length}</span>
          <span className="stat-sub">Completed on {currentDate}</span>
        </div>

        <div className="completed-stat-card card-purple">
          <span className="stat-label">Weekly Completed</span>
          <span className="stat-num">{weeklyCompleted.length}</span>
          <span className="stat-sub">Past 7 days productivity</span>
        </div>

        <div className="completed-stat-card card-blue">
          <span className="stat-label">Monthly Completed</span>
          <span className="stat-num">{monthlyCompleted.length}</span>
          <span className="stat-sub">September 2026 total</span>
        </div>
      </div>

      {/* Completed Tasks Table / Cards */}
      <div className="section-block">
        <div className="section-header-row">
          <div>
            <h3 className="section-main-heading">Completed Task History</h3>
            <p className="section-sub-heading">Detailed records of finished homework, projects, and study milestones.</p>
          </div>
          <span className="count-pill">{completedTasks.length} Completed Total</span>
        </div>

        {completedTasks.length === 0 ? (
          <EmptyState
            icon="⌛"
            title="No completed tasks yet"
            message="Check off tasks on your Dashboard or All Tasks page to populate your completion archive."
          />
        ) : (
          <div className="completed-tasks-list">
            {completedTasks.map(task => (
              <div key={task.id} className="completed-task-row">
                <div className="comp-row-left">
                  <span className="comp-check-icon">✓</span>
                  <div>
                    <h4 className="comp-task-title">{task.title}</h4>
                    <div className="comp-meta-sub">
                      <span>📚 {task.subject || 'General'}</span>
                      <span>&bull;</span>
                      <span>🏷️ {task.type}</span>
                      <span>&bull;</span>
                      <span>📅 Completed: {task.date}</span>
                      {task.due_time && (
                        <>
                          <span>&bull;</span>
                          <span>⏰ Time: {task.due_time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="comp-row-right">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="btn-undo-complete"
                    title="Restore task to pending"
                  >
                    ↺ Undo
                  </button>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="btn-delete-completed"
                    title="Remove from history"
                  >
                    🗑️
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

export default CompletedTasks;
