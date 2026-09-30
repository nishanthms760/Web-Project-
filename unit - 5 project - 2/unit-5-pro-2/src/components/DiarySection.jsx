import { useState, useEffect, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { diaryService } from '../services/diaryService';
import TaskCard from './TaskCard';

function DiarySection({ initialDate, onOpenAddTask, onEditTask }) {
  const { tasks, triggerNotification } = useTasks();
  const [diaryDate, setDiaryDate] = useState(initialDate || '2026-09-29');
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [diaryId, setDiaryId] = useState(null);

  // Load notes for selected date from real backend database
  useEffect(() => {
    diaryService.getDiaryByDate(diaryDate)
      .then(res => {
        setNotes(res?.notes || '');
        setDiaryId(res?.id || null);
      })
      .catch(() => {
        // Fallback local note
        const saved = localStorage.getItem(`studyflow_diary_${diaryDate}`) || '';
        setNotes(saved);
      });
  }, [diaryDate]);

  // Save Diary notes to database
  const handleSaveDiaryNotes = async () => {
    try {
      setIsSavingNotes(true);
      const res = await diaryService.saveDiary(diaryDate, notes);
      setDiaryId(res.id);
      localStorage.setItem(`studyflow_diary_${diaryDate}`, notes);
      triggerNotification('📖 Diary entry saved permanently to database!', 'success');
    } catch (err) {
      localStorage.setItem(`studyflow_diary_${diaryDate}`, notes);
      triggerNotification('Diary saved locally!', 'info');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Date Navigation (Previous Day / Next Day)
  const navigateDay = (offset) => {
    const parts = diaryDate.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    d.setDate(d.getDate() + offset);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDiaryDate(`${yyyy}-${mm}-${dd}`);
  };

  const formattedHeaderDate = useMemo(() => {
    const parts = diaryDate.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [diaryDate]);

  // Filter tasks for this diary date
  const dateTasks = useMemo(() => {
    return tasks.filter(t => t.date === diaryDate);
  }, [tasks, diaryDate]);

  // Organize tasks by the prompt's 5 specific time categories:
  // 1. Morning, 2. School/College, 3. Afternoon, 4. Evening, 5. Night
  const timeBuckets = useMemo(() => {
    const buckets = {
      morning: [],
      college: [],
      afternoon: [],
      evening: [],
      night: []
    };

    dateTasks.forEach(task => {
      const type = (task.type || '').toLowerCase();
      const time = task.start_time || '10:00';
      const hour = parseInt(time.split(':')[0], 10);

      if (type === 'college' || type === 'school') {
        buckets.college.push(task);
      } else if (hour < 12) {
        buckets.morning.push(task);
      } else if (hour >= 12 && hour < 17) {
        buckets.afternoon.push(task);
      } else if (hour >= 17 && hour < 21) {
        buckets.evening.push(task);
      } else {
        buckets.night.push(task);
      }
    });

    return buckets;
  }, [dateTasks]);

  return (
    <div className="diary-section-wrapper">
      {/* Date Navigation Bar */}
      <div className="diary-date-nav-card">
        <button
          onClick={() => navigateDay(-1)}
          className="btn-diary-nav"
        >
          &larr; Previous Day
        </button>

        <div className="diary-current-date-title">
          <span className="diary-badge-live">DAILY JOURNAL</span>
          <h2>{formattedHeaderDate}</h2>
        </div>

        <button
          onClick={() => navigateDay(1)}
          className="btn-diary-nav"
        >
          Next Day &rarr;
        </button>
      </div>

      {/* Main Two-Column Layout: Time Slot Blocks on Left, Diary Notes on Right */}
      <div className="diary-content-two-col">
        {/* Left Column: 5 Time-based Activity Categories */}
        <div className="diary-time-slots-col">
          {/* 1. Morning */}
          <div className="time-slot-card slot-morning">
            <div className="slot-header">
              <div className="slot-icon-title">
                <span className="slot-icon">🌅</span>
                <div>
                  <h4>Morning Routine</h4>
                  <span className="slot-sub">06:00 AM – 11:59 AM</span>
                </div>
              </div>
              <button
                className="btn-slot-quick-add"
                onClick={() => onOpenAddTask(diaryDate, 'Morning')}
              >
                + Add Task
              </button>
            </div>
            <div className="slot-tasks-list">
              {timeBuckets.morning.length === 0 ? (
                <p className="slot-empty-text">No morning tasks scheduled.</p>
              ) : (
                timeBuckets.morning.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))
              )}
            </div>
          </div>

          {/* 2. School / College */}
          <div className="time-slot-card slot-college">
            <div className="slot-header">
              <div className="slot-icon-title">
                <span className="slot-icon">🏛️</span>
                <div>
                  <h4>School / College Classes &amp; Labs</h4>
                  <span className="slot-sub">Lectures • Practical Labs • Study Activities</span>
                </div>
              </div>
              <button
                className="btn-slot-quick-add"
                onClick={() => onOpenAddTask(diaryDate, 'College')}
              >
                + Add Task
              </button>
            </div>
            <div className="slot-tasks-list">
              {timeBuckets.college.length === 0 ? (
                <p className="slot-empty-text">No college lectures scheduled for today.</p>
              ) : (
                timeBuckets.college.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))
              )}
            </div>
          </div>

          {/* 3. Afternoon */}
          <div className="time-slot-card slot-afternoon">
            <div className="slot-header">
              <div className="slot-icon-title">
                <span className="slot-icon">☀️</span>
                <div>
                  <h4>Afternoon Study &amp; Tasks</h4>
                  <span className="slot-sub">12:00 PM – 04:59 PM</span>
                </div>
              </div>
              <button
                className="btn-slot-quick-add"
                onClick={() => onOpenAddTask(diaryDate, 'Afternoon')}
              >
                + Add Task
              </button>
            </div>
            <div className="slot-tasks-list">
              {timeBuckets.afternoon.length === 0 ? (
                <p className="slot-empty-text">No afternoon tasks scheduled.</p>
              ) : (
                timeBuckets.afternoon.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))
              )}
            </div>
          </div>

          {/* 4. Evening */}
          <div className="time-slot-card slot-evening">
            <div className="slot-header">
              <div className="slot-icon-title">
                <span className="slot-icon">🌆</span>
                <div>
                  <h4>Evening Projects &amp; Homework</h4>
                  <span className="slot-sub">05:00 PM – 08:59 PM</span>
                </div>
              </div>
              <button
                className="btn-slot-quick-add"
                onClick={() => onOpenAddTask(diaryDate, 'Evening')}
              >
                + Add Task
              </button>
            </div>
            <div className="slot-tasks-list">
              {timeBuckets.evening.length === 0 ? (
                <p className="slot-empty-text">No evening tasks scheduled.</p>
              ) : (
                timeBuckets.evening.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))
              )}
            </div>
          </div>

          {/* 5. Night */}
          <div className="time-slot-card slot-night">
            <div className="slot-header">
              <div className="slot-icon-title">
                <span className="slot-icon">🌙</span>
                <div>
                  <h4>Night Revision &amp; Reflection</h4>
                  <span className="slot-sub">09:00 PM – 11:59 PM</span>
                </div>
              </div>
              <button
                className="btn-slot-quick-add"
                onClick={() => onOpenAddTask(diaryDate, 'Night')}
              >
                + Add Task
              </button>
            </div>
            <div className="slot-tasks-list">
              {timeBuckets.night.length === 0 ? (
                <p className="slot-empty-text">No night revision scheduled.</p>
              ) : (
                timeBuckets.night.map(task => (
                  <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Diary Notes Section */}
        <div className="diary-notes-col">
          <div className="diary-notes-card">
            <div className="notes-header">
              <div className="notes-title">
                <span className="notes-icon">✍️</span>
                <div>
                  <h3>Today's Notes &amp; Reflections</h3>
                  <span className="notes-sub">Permanent Database Journal</span>
                </div>
              </div>
            </div>

            <p className="notes-prompt">
              Record lecture takeaways, key topics memorized, blockers encountered, and tomorrow's academic goals:
            </p>

            <textarea
              className="diary-textarea"
              rows="12"
              placeholder="Write your personal reflections for today... (e.g. Mastered Partial Derivatives, revised AVL rotations, completed React state design)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>

            <div className="notes-footer-actions">
              <span className="notes-char-count">
                {notes.length} characters &bull; Auto-persisted
              </span>

              <button
                type="button"
                className="btn-save-diary"
                onClick={handleSaveDiaryNotes}
                disabled={isSavingNotes}
              >
                {isSavingNotes ? 'Saving...' : '💾 Save Diary'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiarySection;
