import { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import TaskModal from '../components/TaskModal';

function AllTasks() {
  const { tasks, currentDate } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filterOptions = [
    'All',
    'Pending',
    'In Progress',
    'Completed',
    'High Priority',
    'Today',
    'This Week',
    'Overdue'
  ];

  // Filter and search computation
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 1. Text search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        task.title.toLowerCase().includes(q) ||
        (task.description && task.description.toLowerCase().includes(q)) ||
        (task.subject && task.subject.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Category filter
      if (filterType === 'All') return true;
      if (filterType === 'Pending') return task.status === 'Pending';
      if (filterType === 'In Progress') return task.status === 'In Progress';
      if (filterType === 'Completed') return task.status === 'Completed';
      if (filterType === 'High Priority') return task.priority === 'High';
      if (filterType === 'Today') return task.date === currentDate;
      if (filterType === 'This Week') {
        const diffDays = Math.abs(new Date(currentDate) - new Date(task.date)) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      }
      if (filterType === 'Overdue') {
        return task.date < currentDate && task.status !== 'Completed';
      }

      return true;
    });
  }, [tasks, searchQuery, filterType, currentDate]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container all-tasks-page">
      {/* Header Row */}
      <div className="page-header-row">
        <div>
          <span className="page-meta-badge">TASK MANAGEMENT</span>
          <h1 className="page-main-title">All Student Tasks</h1>
          <p className="page-subtitle-text">
            Search, filter, prioritize, and manage all your academic assignments, homework, and study tasks.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={handleOpenAdd}
        >
          <span>+</span> Add Task
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="tasks-filter-card">
        {/* Search input */}
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks by title, subject, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="filter-chips-row">
          {filterOptions.map(opt => (
            <button
              key={opt}
              className={`filter-chip ${filterType === opt ? 'active' : ''}`}
              onClick={() => setFilterType(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Task Count Info */}
      <div className="tasks-meta-bar">
        <span>Showing <strong>{filteredTasks.length}</strong> tasks (Total: {tasks.length})</span>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No tasks match your filter"
          message="Try selecting a different filter option or clear your search."
          actionText="+ Create New Task"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="tasks-cards-stack">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />
    </div>
  );
}

export default AllTasks;
