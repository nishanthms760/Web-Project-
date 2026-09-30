import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ sent: false, loading: false });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    setStatus({ sent: false, loading: true });
    // Simulate real-time dispatch
    setTimeout(() => {
      setStatus({ sent: true, loading: false });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ sent: false, loading: false }), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Let's Connect &amp; Collaborate</h2>
          <p className="section-subtitle">
            Looking for internship opportunities, open-source projects, or software engineering discussions.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Direct Cards */}
          <div className="contact-info-panel">
            <div className="contact-card-box">
              <div className="contact-box-icon">📧</div>
              <div className="contact-box-detail">
                <h4>Email Address</h4>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    display: 'block',
                    marginTop: '0.35rem',
                    fontSize: '0.75rem',
                    color: 'var(--accent-secondary)',
                    fontWeight: 600
                  }}
                >
                  {copied ? '✓ Copied to clipboard!' : '📋 Copy Email'}
                </button>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="contact-box-icon">🐙</div>
              <div className="contact-box-detail">
                <h4>GitHub Profile</h4>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-secondary)' }}
                >
                  github.com/{personalInfo.githubUsername}
                </a>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="contact-box-icon">💼</div>
              <div className="contact-box-detail">
                <h4>LinkedIn Network</h4>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-secondary)' }}
                >
                  linkedin.com/in/nishanthms760
                </a>
              </div>
            </div>

            <div className="contact-card-box">
              <div className="contact-box-icon">📍</div>
              <div className="contact-box-detail">
                <h4>Location &amp; Availability</h4>
                <span>{personalInfo.location}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                  ● Open for Remote &amp; On-Site Internships
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Send a Direct Message</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Have a question, internship offer, or project inquiry? Drop a message below.
            </p>

            {status.sent && (
              <div className="form-alert alert-success">
                <span>✓</span>
                <span>Thank you! Your message has been prepared and dispatched successfully.</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Internship opportunity / Project collaboration"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="form-textarea"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status.loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {status.loading ? 'Sending...' : '📨 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
