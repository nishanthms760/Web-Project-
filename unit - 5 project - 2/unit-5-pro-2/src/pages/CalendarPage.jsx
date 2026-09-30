import { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import EmptyState from '../components/EmptyState';

function CalendarPage() {
  const { tasks, currentDate } = useTasks();

  const [selectedDate, setSelectedDate] = useState('2026-09-29');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('2026-09-29');
  const [editingTask, setEditingTask] = useState(null);

  // Tasks for selected date
  const selectedDateTasks = useMemo(() => {
    return tasks.filter(t => t.date === selectedDate);
  }, [tasks, selectedDate]);

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleAddTaskForDate = (dateStr) => {
    setEditingTask(null);
    setModalDate(dateStr);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalDate(task.date);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container calendar-page">
      <div className="page-header-row">
        <div>
          <span className="page-meta-badge">CALENDAR MATRIX</span>
          <h1 className="page-main-title">Interactive Study Calendar</h1>
          <p className="page-subtitle-text">
            Select any calendar date to inspect scheduled homework, study sessions, and exams, or click '+' to schedule new tasks.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => handleAddTaskForDate(selectedDate)}
        >
          <span>+</span> Add Task for {selectedDate}
        </button>
      </div>

      {/* Calendar Grid Component */}
      <div className="section-block">
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onAddTaskForDate={handleAddTaskForDate}
        />
      </div>

      {/* Selected Date Tasks Pane */}
      <div className="section-block">
        <div className="selected-date-tasks-header">
          <div>
            <h3>Tasks for {selectedDate} {selectedDate === currentDate ? '(Today)' : ''}</h3>
            <p>Showing all scheduled activities for this selected calendar date.</p>
          </div>
          <button
            className="btn-text-action"
            onClick={() => handleAddTaskForDate(selectedDate)}
          >
            + Add Task for {selectedDate}
          </button>
        </div>

        {selectedDateTasks.length === 0 ? (
          <EmptyState
            icon="📅"
            title={`No tasks scheduled on ${selectedDate}`}
            message="Your schedule is completely open for this day."
            actionText={`+ Add Task for ${selectedDate}`}
            onAction={() => handleAddTaskForDate(selectedDate)}
          />
        ) : (
          <div className="tasks-cards-stack">
            {selectedDateTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        defaultDate={modalDate}
        editingTask={editingTask}
      />
    </div>
  );
}

export default CalendarPage;
