import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import ProgressCard from '../components/ProgressCard';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import TaskModal from '../components/TaskModal';

function Dashboard() {
  const { user } = useAuth();
  const {
    todayTasks,
    todayCompleted,
    todayPending,
    todayInProgress,
    weeklyCompletionRate,
    currentDate
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Dynamic greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  // Dynamic date string
  const formattedDate = (() => {
    try {
      const parts = currentDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tuesday, September 29, 2026';
    }
  })();

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container dashboard-page">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-text-side">
          <div className="welcome-meta-pill">
            <span className="pulse-dot"></span>
            <span>{formattedDate}</span>
          </div>

          <h1 className="welcome-title">
            {greeting}, {user?.name || 'Student'}! 👋
          </h1>

          <p className="motivational-quote">
            &ldquo;Small progress every day leads to big results.&rdquo;
          </p>
        </div>

        <div className="welcome-action-side">
          <button
            className="btn-quick-add-large"
            onClick={handleOpenAdd}
          >
            <span className="plus-sign">+</span> Add Task
          </button>
        </div>
      </div>

      {/* 5 Summary KPI Cards */}
      <div className="dashboard-summary-grid">
        {/* Card 1: Today's Tasks */}
        <div className="summary-card card-accent-blue">
          <div className="summary-icon-box">📋</div>
          <div className="summary-info">
            <span className="summary-number">{todayTasks.length}</span>
            <span className="summary-label">Today's Tasks</span>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="summary-card card-accent-green">
          <div className="summary-icon-box">✅</div>
          <div className="summary-info">
            <span className="summary-number">{todayCompleted.length}</span>
            <span className="summary-label">Completed</span>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="summary-card card-accent-amber">
          <div className="summary-icon-box">⏳</div>
          <div className="summary-info">
            <span className="summary-number">{todayPending.length}</span>
            <span className="summary-label">Pending</span>
          </div>
        </div>

        {/* Card 4: In Progress */}
        <div className="summary-card card-accent-indigo">
          <div className="summary-icon-box">⚡</div>
          <div className="summary-info">
            <span className="summary-number">{todayInProgress.length}</span>
            <span className="summary-label">In Progress</span>
          </div>
        </div>

        {/* Card 5: Weekly Completion */}
        <div className="summary-card card-accent-purple">
          <div className="summary-icon-box">📈</div>
          <div className="summary-info">
            <span className="summary-number">{weeklyCompletionRate}%</span>
            <span className="summary-label">Weekly Completion</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="section-block">
        <ProgressCard />
      </div>

      {/* Today's Tasks Section */}
      <div className="section-block">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">Today's Schedule &amp; Tasks</h2>
            <p className="section-sub-heading">Check off tasks as you finish them to update your live progress.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="btn-text-action"
          >
            + New Task
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="No tasks scheduled for today"
            message="You're free or haven't planned yet. Add a task to kickstart your productivity!"
            onAction={handleOpenAdd}
          />
        ) : (
          <div className="tasks-cards-stack">
            {todayTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal Dialog */}
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

export default Dashboard;
