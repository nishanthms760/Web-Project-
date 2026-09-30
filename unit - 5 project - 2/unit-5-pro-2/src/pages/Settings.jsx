import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

function Settings() {
  const { theme, setThemeMode } = useTheme();
  const { logout } = useAuth();
  const { triggerNotification } = useTasks();

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('studyflow_notifs') !== 'false';
  });

  const handleToggleNotifications = () => {
    const nextVal = !notificationsEnabled;
    setNotificationsEnabled(nextVal);
    localStorage.setItem('studyflow_notifs', String(nextVal));
    triggerNotification(
      nextVal ? 'Reminders & Notifications Enabled' : 'Notifications Disabled',
      'info'
    );
  };

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
    triggerNotification(`Switched to ${newTheme} mode`, 'success');
  };

  return (
    <div className="page-container settings-page">
      <div className="page-header-row">
        <div>
          <span className="page-meta-badge">APP CONFIGURATION</span>
          <h1 className="page-main-title">System Settings &amp; Preferences</h1>
          <p className="page-subtitle-text">
            Personalize your theme, reminder alerts, and account security.
          </p>
        </div>
      </div>

      <div className="settings-sections-list">
        {/* 1. Appearance */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🎨</span>
            <div>
              <h3>Appearance &amp; Theme</h3>
              <p>Customize the visual interface of StudyFlow.</p>
            </div>
          </div>

          <div className="theme-options-grid">
            <button
              className={`theme-option-btn ${theme === 'light' ? 'selected' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="theme-preview preview-light">☀️</div>
              <span className="theme-title">Light Mode</span>
              <span className="theme-desc">Clean slate daylight theme</span>
            </button>

            <button
              className={`theme-option-btn ${theme === 'dark' ? 'selected' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="theme-preview preview-dark">🌙</div>
              <span className="theme-title">Dark Mode</span>
              <span className="theme-desc">Low light, eye-friendly</span>
            </button>

            <button
              className={`theme-option-btn ${theme === 'system' ? 'selected' : ''}`}
              onClick={() => handleThemeChange('system')}
            >
              <div className="theme-preview preview-system">💻</div>
              <span className="theme-title">System Mode</span>
              <span className="theme-desc">Follow OS system theme</span>
            </button>
          </div>
        </div>

        {/* 2. Notifications & Reminders */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🔔</span>
            <div>
              <h3>Notifications &amp; Reminders</h3>
              <p>Control task alert banners and sound notifications.</p>
            </div>
          </div>

          <div className="setting-toggle-row">
            <div>
              <strong>Enable In-App Reminders</strong>
              <p>Receive popup notification badges for scheduled tasks.</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleToggleNotifications}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* 3. Account Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <span className="settings-icon">🛡️</span>
            <div>
              <h3>Account &amp; Security</h3>
              <p>Manage your profile, password, or sign out.</p>
            </div>
          </div>

          <div className="account-actions-list">
            <div className="account-action-item">
              <div>
                <strong>Student Profile Information</strong>
                <p>Change your name, email, or avatar picture.</p>
              </div>
              <Link to="/profile" className="btn-secondary">
                Edit Profile &rarr;
              </Link>
            </div>

            <div className="account-action-item">
              <div>
                <strong>Sign Out</strong>
                <p>Log out of your student session securely.</p>
              </div>
              <button onClick={logout} className="btn-danger">
                Logout Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
