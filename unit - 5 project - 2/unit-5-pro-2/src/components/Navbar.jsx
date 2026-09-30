import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

function Navbar({ onToggleSidebar, onOpenAddTask }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { notification, currentDate } = useTasks();

  // Format current date nicely: "Tuesday, September 29, 2026"
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

  return (
    <header className="study-navbar">
      <div className="navbar-left">
        <button
          className="mobile-hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Open Navigation Menu"
        >
          ☰
        </button>

        <div className="navbar-date-display">
          <span className="navbar-calendar-icon">📅</span>
          <div>
            <strong className="navbar-date-text">{formattedDate}</strong>
            <span className="navbar-date-sub">Daily Academic Planner</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        {/* Toast notification badge */}
        {notification && (
          <div className={`navbar-toast-pill toast-${notification.type}`}>
            <span>{notification.message}</span>
          </div>
        )}

        {/* Theme Mode Switcher */}
        <button
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Large + Add Task Button */}
        <button
          className="btn-navbar-add-task"
          onClick={onOpenAddTask}
        >
          <span>+</span> Add Task
        </button>

        {/* User Avatar Mini */}
        {user && (
          <Link to="/profile" className="navbar-avatar-btn" title="View Student Profile">
            <img
              src={user.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
              alt={user.name}
            />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
