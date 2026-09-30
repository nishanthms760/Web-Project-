import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📖</div>
          <h2>Create Student Account</h2>
          <p>Start organizing your daily study plans and tasks</p>
        </div>

        {error && <div className="auth-error-banner">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="regName">Student Name *</label>
            <input
              type="text"
              id="regName"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="auth-input"
              placeholder="e.g. Nishanth M S"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regEmail">Email Address *</label>
            <input
              type="email"
              id="regEmail"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="student@college.edu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regPass">Password (min 6 chars) *</label>
            <input
              type="password"
              id="regPass"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regConf">Confirm Password *</label>
            <input
              type="password"
              id="regConf"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Create Account & Enter Portal →'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Log In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
