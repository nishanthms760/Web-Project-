import { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';

function Calendar({ onDateSelect, onAddTaskForDate, selectedDate }) {
  const { tasks, currentDate } = useTasks();

  // Selected view month & year (default: September 2026)
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(8); // 0-indexed: 8 = September

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Navigate months
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleToday = () => {
    setViewYear(2026);
    setViewMonth(8);
    if (onDateSelect) onDateSelect('2026-09-29');
  };

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const mm = String(viewMonth === 0 ? 12 : viewMonth).padStart(2, '0');
      const yyyy = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${yyyy}-${mm}-${String(d).padStart(2, '0')}`;
      days.push({ dayNumber: d, dateStr, isCurrentMonth: false });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(viewMonth + 1).padStart(2, '0');
      const dateStr = `${viewYear}-${mm}-${String(d).padStart(2, '0')}`;
      days.push({ dayNumber: d, dateStr, isCurrentMonth: true });
    }

    // Next month padding to fill 35 or 42 cells
    const remaining = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const mm = String(viewMonth + 2 > 12 ? 1 : viewMonth + 2).padStart(2, '0');
      const yyyy = viewMonth + 2 > 12 ? viewYear + 1 : viewYear;
      const dateStr = `${yyyy}-${mm}-${String(d).padStart(2, '0')}`;
      days.push({ dayNumber: d, dateStr, isCurrentMonth: false });
    }

    return days;
  }, [viewYear, viewMonth]);

  // Tasks map by date
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach(t => {
      if (!map[t.date]) map[t.date] = [];
      map[t.date].push(t);
    });
    return map;
  }, [tasks]);

  return (
    <div className="study-calendar-card">
      {/* Calendar Header Controls */}
      <div className="calendar-header-toolbar">
        <div className="calendar-month-title">
          <h3>{monthNames[viewMonth]} {viewYear}</h3>
          <span className="calendar-active-tag">Academic Schedule</span>
        </div>

        <div className="calendar-nav-buttons">
          <button onClick={handlePrevMonth} className="btn-cal-nav" title="Previous Month">
            &larr; Prev
          </button>
          <button onClick={handleToday} className="btn-cal-today">
            Today
          </button>
          <button onClick={handleNextMonth} className="btn-cal-nav" title="Next Month">
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="calendar-weekdays-row">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-days">
        {calendarDays.map((cell, idx) => {
          const dateTasks = tasksByDate[cell.dateStr] || [];
          const isSelected = selectedDate === cell.dateStr;
          const isToday = cell.dateStr === currentDate;
          const hasCompleted = dateTasks.some(t => t.status === 'Completed');
          const hasPending = dateTasks.some(t => t.status === 'Pending');

          return (
            <div
              key={idx}
              className={`calendar-cell ${!cell.isCurrentMonth ? 'cell-muted' : ''} ${isSelected ? 'cell-selected' : ''} ${isToday ? 'cell-today' : ''}`}
              onClick={() => onDateSelect && onDateSelect(cell.dateStr)}
            >
              <div className="cell-top">
                <span className="cell-day-num">{cell.dayNumber}</span>
                {cell.isCurrentMonth && (
                  <button
                    className="cell-quick-add"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddTaskForDate(cell.dateStr);
                    }}
                    title={`Add task for ${cell.dateStr}`}
                  >
                    +
                  </button>
                )}
              </div>

              {dateTasks.length > 0 && (
                <div className="cell-task-indicator-strip">
                  <span className="cell-count-pill">
                    {dateTasks.length} {dateTasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                  <div className="cell-dots-row">
                    {hasCompleted && <span className="cell-dot dot-green" title="Completed"></span>}
                    {hasPending && <span className="cell-dot dot-amber" title="Pending"></span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
