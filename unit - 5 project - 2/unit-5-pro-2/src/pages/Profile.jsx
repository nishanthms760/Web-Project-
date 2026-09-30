import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

function Profile() {
  const { user, updateProfile } = useAuth();
  const { tasks, weeklyCompletionRate, triggerNotification } = useTasks();

  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  const [form, setForm] = useState({
    name: user?.name || 'Nishanth M S',
    email: user?.email || 'nishanth@edudiary.edu',
    profile_image: user?.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    password: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile(form);
      triggerNotification('Profile credentials updated successfully in database!', 'success');
    } catch (err) {
      triggerNotification(err.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-container profile-page">
      <div className="page-header-row">
        <div>
          <span className="page-meta-badge">STUDENT RECORD</span>
          <h1 className="page-main-title">Student Profile &amp; Stats</h1>
          <p className="page-subtitle-text">
            Manage your personal academic identity, track study streaks, and update your credentials.
          </p>
        </div>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: Profile Card & Stats */}
        <div className="profile-badge-card">
          <div className="profile-avatar-stack">
            <img
              src={form.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={form.name}
              className="large-student-avatar"
            />
          </div>

          <h2 className="student-profile-title">{user?.name || 'Student'}</h2>
          <span className="student-profile-role">Computer Science Engineering • 2nd Year B.E.</span>
          <span className="student-email-tag">{user?.email}</span>

          <div className="profile-metrics-list">
            <div className="profile-metric-item">
              <span className="metric-icon">🔥</span>
              <div>
                <strong>5-Day Streak</strong>
                <span>Active Daily Goal</span>
              </div>
            </div>

            <div className="profile-metric-item">
              <span className="metric-icon">📝</span>
              <div>
                <strong>{tasks.length} Total Tasks</strong>
                <span>Cumulative Log</span>
              </div>
            </div>

            <div className="profile-metric-item">
              <span className="metric-icon">✅</span>
              <div>
                <strong>{completedCount} Completed</strong>
                <span>Finished Work</span>
              </div>
            </div>

            <div className="profile-metric-item">
              <span className="metric-icon">📊</span>
              <div>
                <strong>{weeklyCompletionRate}% Weekly Rate</strong>
                <span>Productivity Index</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="profile-form-card">
          <div className="form-card-header">
            <h3>Update Profile Credentials</h3>
            <p>Modify your name, avatar URL, or update your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="student-credentials-form">
            <div className="form-group">
              <label htmlFor="profName">Full Name</label>
              <input
                type="text"
                id="profName"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profEmail">Email Address</label>
              <input
                type="email"
                id="profEmail"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profImage">Profile Image URL</label>
              <input
                type="url"
                id="profImage"
                name="profile_image"
                value={form.profile_image}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profPass">Change Password</label>
              <input
                type="password"
                id="profPass"
                name="password"
                placeholder="Leave blank to keep existing password"
                value={form.password}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-submit-row">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSaving}
              >
                {isSaving ? 'Updating...' : '💾 Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
