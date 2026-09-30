import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🔐</div>
          <h2>Reset Password</h2>
          <p>We'll send password recovery instructions to your email</p>
        </div>

        {submitted ? (
          <div className="auth-success-banner">
            <strong>Check your inbox!</strong>
            <p>If an account exists for {email}, a recovery token has been generated.</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/login" className="btn-auth-submit" style={{ display: 'block', textAlign: 'center' }}>
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="resetEmail">Registered Student Email</label>
              <input
                type="email"
                id="resetEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="student@edudiary.edu"
                required
              />
            </div>

            <button type="submit" className="btn-auth-submit">
              Send Password Reset Link
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>Remember your password? <Link to="/login" className="auth-link">Back to Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
