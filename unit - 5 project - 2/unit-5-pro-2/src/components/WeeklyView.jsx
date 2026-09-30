import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function WeeklyView() {
  const { tasks, currentDate, setCurrentDate } = useTasks();
  const navigate = useNavigate();

  // Week offset (0 = this week, -1 = prev, +1 = next)
  const [weekOffset, setWeekOffset] = useState(0);

  // Compute 7 days of the week centered on 2026-09-29 + weekOffset
  const weekDays = useMemo(() => {
    // September 29, 2026 is Tuesday. Monday was Sept 28, 2026.
    const baseMonday = new Date(2026, 8, 28); // 2026-09-28
    baseMonday.setDate(baseMonday.getDate() + (weekOffset * 7));

    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(baseMonday);
      d.setDate(baseMonday.getDate() + i);

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      days.push({
        label: dayLabels[i],
        dateStr,
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
        isToday: dateStr === currentDate
      });
    }

    return days;
  }, [weekOffset, currentDate]);

  const handleDayClick = (dateStr) => {
    setCurrentDate(dateStr);
    navigate(`/diary?date=${dateStr}`);
  };

  return (
    <div className="weekly-planner-wrapper">
      {/* Controls Bar */}
      <div className="weekly-controls-bar">
        <div className="weekly-title-wrap">
          <span className="pill-weekly-tag">7-Day Study Horizon</span>
          <h3>Weekly Academic Planner</h3>
        </div>

        <div className="weekly-buttons-group">
          <button
            onClick={() => setWeekOffset(prev => prev - 1)}
            className="btn-weekly-nav"
          >
            &larr; Previous Week
          </button>

          <button
            onClick={() => setWeekOffset(0)}
            className={`btn-weekly-this ${weekOffset === 0 ? 'active' : ''}`}
          >
            This Week
          </button>

          <button
            onClick={() => setWeekOffset(prev => prev + 1)}
            className="btn-weekly-nav"
          >
            Next Week &rarr;
          </button>
        </div>
      </div>

      {/* 7-Day Grid */}
      <div className="weekly-grid-seven">
        {weekDays.map((day) => {
          const dayTasks = tasks.filter(t => t.date === day.dateStr);
          const completed = dayTasks.filter(t => t.status === 'Completed').length;
          const pending = dayTasks.filter(t => t.status === 'Pending').length;
          const inProgress = dayTasks.filter(t => t.status === 'In Progress').length;
          const highPriority = dayTasks.filter(t => t.priority === 'High').length;
          const pct = dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0;

          return (
            <div
              key={day.dateStr}
              className={`weekly-day-card ${day.isToday ? 'day-is-today' : ''}`}
              onClick={() => handleDayClick(day.dateStr)}
              title={`Open ${day.label}, ${day.monthName} ${day.dayNumber} in Daily Diary`}
            >
              <div className="day-card-header">
                <span className="day-label-name">{day.label}</span>
                <span className="day-date-badge">{day.monthName} {day.dayNumber}</span>
              </div>

              {day.isToday && (
                <div className="today-marker-banner">TODAY</div>
              )}

              {/* Progress bar */}
              <div className="day-progress-wrap">
                <div className="day-progress-track">
                  <div
                    className="day-progress-fill"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <div className="day-progress-label">
                  <span>{pct}% Done</span>
                  <span>{completed}/{dayTasks.length}</span>
                </div>
              </div>

              {/* Status indicators */}
              <div className="day-indicators-list">
                <div className="day-stat-chip chip-completed">
                  <span>✓ {completed} Done</span>
                </div>
                <div className="day-stat-chip chip-pending">
                  <span>⏳ {pending} Pending</span>
                </div>
                {inProgress > 0 && (
                  <div className="day-stat-chip chip-progress">
                    <span>⚡ {inProgress} In Prog</span>
                  </div>
                )}
                {highPriority > 0 && (
                  <div className="day-stat-chip chip-high">
                    <span>🔥 {highPriority} High Pri</span>
                  </div>
                )}
              </div>

              <div className="day-card-footer">
                <span className="open-diary-hint">Open Diary &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyView;
