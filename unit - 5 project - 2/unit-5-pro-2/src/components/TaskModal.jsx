import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskModal({ isOpen, onClose, editingTask = null, defaultDate = null }) {
  const { addTask, editTask, currentDate } = useTasks();

  const initialForm = {
    title: '',
    description: '',
    subject: 'General',
    date: defaultDate || currentDate,
    start_time: '09:00',
    due_time: '11:00',
    type: 'Daily Task',
    priority: 'Medium',
    status: 'Pending',
    reminder: 'None'
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({ ...editingTask });
    } else {
      setForm({
        ...initialForm,
        date: defaultDate || currentDate
      });
    }
    setError('');
  }, [editingTask, isOpen, defaultDate, currentDate]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Please provide a task title.');
      return;
    }
    if (!form.date) {
      setError('Please pick a date for the task.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingTask && editingTask.id) {
        await editTask(editingTask.id, form);
      } else {
        await addTask(form);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="study-modal-overlay" onClick={onClose}>
      <div className="study-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-block">
            <span className="modal-pill">{editingTask ? 'Edit Task' : 'Quick Task Creation'}</span>
            <h3>{editingTask ? 'Update Task Details' : 'Add New Student Task'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {error && (
          <div className="modal-error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form-body">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title *</label>
            <input
              type="text"
              id="taskTitle"
              name="title"
              placeholder="e.g. Mathematics Calculus Homework Problem Set"
              value={form.title}
              onChange={handleChange}
              className="modal-input"
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="taskDesc">Description / Checklist</label>
            <textarea
              id="taskDesc"
              name="description"
              rows="2"
              placeholder="Add key notes, page numbers, or submission instructions..."
              value={form.description}
              onChange={handleChange}
              className="modal-input modal-textarea"
            ></textarea>
          </div>

          {/* Row 1: Subject & Task Type */}
          <div className="form-grid-two">
            <div className="form-group">
              <label htmlFor="taskSubject">Subject / Category</label>
              <input
                type="text"
                id="taskSubject"
                name="subject"
                placeholder="e.g. Mathematics, Physics, CS"
                value={form.subject}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskType">Task Type</label>
              <select
                id="taskType"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="modal-select"
              >
                <option value="Daily Task">Daily Task</option>
                <option value="Homework">Homework</option>
                <option value="Study">Study</option>
                <option value="Project">Project</option>
                <option value="Personal">Personal</option>
                <option value="College">College</option>
                <option value="School">School</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 2: Date, Start Time, Due Time */}
          <div className="form-grid-three">
            <div className="form-group">
              <label htmlFor="taskDate">Date *</label>
              <input
                type="date"
                id="taskDate"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskStartTime">Start Time</label>
              <input
                type="time"
                id="taskStartTime"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDueTime">Due Time</label>
              <input
                type="time"
                id="taskDueTime"
                name="due_time"
                value={form.due_time}
                onChange={handleChange}
                className="modal-input"
              />
            </div>
          </div>

          {/* Row 3: Priority, Status, Reminder */}
          <div className="form-grid-three">
            <div className="form-group">
              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="modal-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="taskStatus">Status</label>
              <select
                id="taskStatus"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="modal-select"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="taskReminder">Reminder</label>
              <select
                id="taskReminder"
                name="reminder"
                value={form.reminder}
                onChange={handleChange}
                className="modal-select"
              >
                <option value="None">None</option>
                <option value="10 minutes before">10 minutes before</option>
                <option value="30 minutes before">30 minutes before</option>
                <option value="1 hour before">1 hour before</option>
                <option value="1 day before">1 day before</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
