import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('nishanth@edudiary.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('nishanth@edudiary.edu');
    setPassword('password123');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📖</div>
          <h2>Welcome to StudyFlow</h2>
          <p>Student Daily Diary &amp; Task Planning Suite</p>
        </div>

        {error && <div className="auth-error-banner">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="loginEmail">Student Email</label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="student@edudiary.edu"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-with-link">
              <label htmlFor="loginPass">Password</label>
              <Link to="/forgot-password" className="auth-link-subtle">Forgot Password?</Link>
            </div>
            <input
              type="password"
              id="loginPass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>

          <button
            type="button"
            className="btn-demo-creds"
            onClick={fillDemo}
          >
            🔑 Fill Demo Student Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account yet? <Link to="/register" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
