import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskCard({ task, onEdit }) {
  const { toggleComplete, removeTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [animatingCheck, setAnimatingCheck] = useState(false);

  const isCompleted = task.status === 'Completed';

  const handleCheck = () => {
    setAnimatingCheck(true);
    setTimeout(() => {
      toggleComplete(task.id);
      setAnimatingCheck(false);
    }, 200);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        removeTask(task.id);
      }, 200);
    }
  };

  return (
    <div className={`task-card ${isCompleted ? 'task-completed' : ''} ${isDeleting ? 'task-exit' : ''} ${animatingCheck ? 'check-animating' : ''}`}>
      <div className="task-card-left">
        {/* Animated Checkbox */}
        <button
          type="button"
          className={`custom-task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={handleCheck}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted ? '✓' : ''}
        </button>

        <div className="task-text-content">
          <h4 className={`task-title ${isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h4>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta-tags">
            {task.subject && (
              <span className="task-pill pill-subject">
                📚 {task.subject}
              </span>
            )}

            <span className="task-pill pill-type">
              🏷️ {task.type}
            </span>

            {task.due_time && (
              <span className="task-pill pill-time">
                ⏰ Due: {task.due_time}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-card-right">
        {/* Priority Badge */}
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority} Priority
        </span>

        {/* Status Pill */}
        <span className={`status-pill pill-${task.status.toLowerCase().replace(' ', '-')}`}>
          {task.status}
        </span>

        {/* Action Buttons */}
        <div className="task-card-actions">
          <button
            type="button"
            className="btn-task-action btn-task-edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            ✏️
          </button>
          <button
            type="button"
            className="btn-task-action btn-task-delete"
            onClick={handleDelete}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
