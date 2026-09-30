import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { todayPending } = useTasks();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: '📊' },
    { to: '/diary', label: 'Daily Diary', icon: '📖' },
    { to: '/weekly', label: 'Weekly View', icon: '🗓️' },
    { to: '/tasks', label: 'All Tasks', icon: '📝', badge: todayPending.length > 0 ? todayPending.length : null },
    { to: '/completed', label: 'Completed Tasks', icon: '✅' },
    { to: '/calendar', label: 'Calendar', icon: '📅' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`study-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-bubble">
            <span>📖</span>
          </div>
          <div className="brand-text">
            <h2>Study<span>Flow</span></h2>
            <span className="brand-badge">Student Diary</span>
          </div>
          <button className="mobile-close-sidebar" onClick={onClose}>✕</button>
        </div>

        {/* Student Mini Profile */}
        {user && (
          <Link to="/profile" className="student-profile-strip" onClick={onClose}>
            <img
              src={user.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="student-avatar"
            />
            <div className="student-info-meta">
              <span className="student-name">{user.name}</span>
              <span className="student-email">{user.email}</span>
            </div>
            <span className="profile-arrow">&rarr;</span>
          </Link>
        )}

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <span className="nav-group-title">MAIN NAVIGATION</span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                  end={item.to === '/'}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="streak-indicator">
            <span className="streak-icon">🔥</span>
            <div>
              <strong>5-Day Study Streak</strong>
              <span>Keep up the focus!</span>
            </div>
          </div>

          <button onClick={logout} className="btn-sidebar-logout">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
