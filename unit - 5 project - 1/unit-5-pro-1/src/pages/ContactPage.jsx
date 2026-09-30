import { useState } from 'react';

function ContactPage() {
  const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const err = {};

    if (!form.fullName.trim()) {
      err.fullName = 'Full Name is required.';
    }

    if (!form.email.trim()) {
      err.email = 'Email address is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email.trim())) {
      err.email = 'Please provide a valid email address.';
    }

    if (!form.phone.trim()) {
      err.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      err.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!form.subject.trim()) {
      err.subject = 'Subject is required.';
    }

    if (!form.message.trim()) {
      err.message = 'Message content is required.';
    } else if (form.message.trim().length < 15) {
      err.message = 'Message must be at least 15 characters long.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setForm(initialForm);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">Institutional Support</span>
            <h1 className="page-main-title">Contact &amp; Examination Helpdesk</h1>
            <p className="page-subtitle-text">
              Have questions regarding student records, grading discrepancies, or report card issuance? Reach out to our campus office.
            </p>
          </div>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="contact-two-column-grid">
          {/* Left Column: Contact Information */}
          <div className="contact-info-panel">
            <div className="info-panel-header">
              <span className="info-tag">CAMPUS PARTICULARS</span>
              <h2>Examination Control Cell</h2>
              <p>
                Our administrative staff and examination controllers are available during working hours to verify academic credentials and assist faculty.
              </p>
            </div>

            <div className="info-cards-list">
              <div className="contact-info-item">
                <div className="info-icon-bubble">🏛️</div>
                <div>
                  <h4>Campus Location</h4>
                  <p>
                    <strong>Prince Dr. K. Vasudevan College of Engineering and Technology (PDKVCET)</strong><br />
                    Medavakkam - Mambakkam Main Road, Ponmar,<br />
                    Chennai - 600 127, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-bubble">✉️</div>
                <div>
                  <h4>Email Communications</h4>
                  <p>
                    Official Portal: <a href="mailto:contact@edureport.edu">contact@edureport.edu</a><br />
                    Controller of Exams: <a href="mailto:coe@pdkvcet.ac.in">coe@pdkvcet.ac.in</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-bubble">📞</div>
                <div>
                  <h4>Telephone &amp; Helplines</h4>
                  <p>
                    Campus Office: <strong>+91 (044) 2834-5678</strong><br />
                    Student Query Desk: <strong>+91 98401 23456</strong>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="info-icon-bubble">🕒</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>
                    Monday – Saturday: <strong>8:30 AM – 5:00 PM</strong><br />
                    Sunday &amp; Public Holidays: <em>Closed</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-links-block">
              <h4>Follow Institutional Updates</h4>
              <div className="social-icon-row">
                <a href="#github" className="social-btn" title="GitHub">🐙 GitHub</a>
                <a href="#linkedin" className="social-btn" title="LinkedIn">💼 LinkedIn</a>
                <a href="#twitter" className="social-btn" title="Twitter / X">🐦 X (Twitter)</a>
                <a href="#portal" className="social-btn" title="Official Web">🌐 Campus Web</a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel">
            {isSubmitted && (
              <div className="alert-banner alert-success animate-fade" style={{ marginBottom: '1.5rem' }}>
                <span className="alert-icon">🎉</span>
                <div>
                  <strong>Your Message Has Been Dispatched!</strong>
                  <p>Thank you for reaching out to EduReport Support. A confirmation token has been logged, and our team will get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <div className="form-card-inner">
              <div className="form-header-title">
                <h3>Submit an Inquiry or Feedback</h3>
                <p>Fill out the fields below. All fields marked with (*) are required.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Dr. K. Ramanathan"
                      value={form.fullName}
                      onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
                </div>

                {/* Email & Phone in 2 cols */}
                <div className="form-grid-two">
                  <div className="form-group">
                    <label htmlFor="contactEmail">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <div className="input-wrap">
                      <span className="input-icon">✉️</span>
                      <input
                        type="email"
                        id="contactEmail"
                        name="email"
                        placeholder="you@institution.edu"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.email && <span className="field-error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactPhone">
                      Phone Number (10 Digits) <span className="req-star">*</span>
                    </label>
                    <div className="input-wrap">
                      <span className="input-icon">📱</span>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="phone"
                        maxLength="10"
                        placeholder="9876543210"
                        value={form.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.phone && <span className="field-error-text">{errors.phone}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject">
                    Subject / Concern <span className="req-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">📌</span>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="e.g. Marks verification for Semester 3"
                      value={form.subject}
                      onChange={handleChange}
                      className={`form-input ${errors.subject ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.subject && <span className="field-error-text">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">
                    Message Details <span className="req-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Please elaborate on your query, student roll number, or technical requirement (min 15 characters)..."
                      value={form.message}
                      onChange={handleChange}
                      className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                    ></textarea>
                  </div>
                  {errors.message && <span className="field-error-text">{errors.message}</span>}
                </div>

                {/* Buttons: Send Message, Reset */}
                <div className="contact-buttons-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary"
                  >
                    ↺ Reset Form
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    ✉️ Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
