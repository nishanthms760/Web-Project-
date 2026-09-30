import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEdu } from '../context/EduContext';

function AddStudentPage() {
  const { addStudent } = useEdu();
  const navigate = useNavigate();

  const initialForm = {
    name: '',
    studentId: '',
    rollNumber: '',
    dob: '',
    gender: 'Male',
    className: '2nd Year B.E.',
    section: 'A',
    department: 'Computer Science & Engineering',
    academicYear: '2024-2025',
    email: '',
    mobile: '',
    parentName: '',
    parentMobile: '',
    address: ''
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on field update
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const err = {};

    // Required fields check
    if (!form.name.trim()) err.name = 'Student Name is required.';
    if (!form.studentId.trim()) {
      err.studentId = 'Student ID is required (e.g. PDK-CSE-2023-085).';
    } else if (form.studentId.trim().length < 4) {
      err.studentId = 'Enter a valid Student ID with at least 4 characters.';
    }

    if (!form.rollNumber.trim()) {
      err.rollNumber = 'Roll Number is required (e.g. 23CSE085).';
    } else if (form.rollNumber.trim().length < 4) {
      err.rollNumber = 'Enter a valid Roll Number.';
    }

    if (!form.dob) {
      err.dob = 'Proper Date of Birth is required.';
    } else {
      const year = new Date(form.dob).getFullYear();
      if (year < 1980 || year > 2015) {
        err.dob = 'Please enter a valid birth date between 1980 and 2015.';
      }
    }

    if (!form.email.trim()) {
      err.email = 'Email address is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email.trim())) {
      err.email = 'Please enter a valid email address (e.g. student@college.edu).';
    }

    if (!form.mobile.trim()) {
      err.mobile = 'Mobile Number is required.';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      err.mobile = 'Mobile Number must be exactly 10 digits.';
    }

    if (!form.parentName.trim()) {
      err.parentName = 'Parent / Guardian name is required.';
    }

    if (!form.parentMobile.trim()) {
      err.parentMobile = 'Parent Mobile Number is required.';
    } else if (!/^\d{10}$/.test(form.parentMobile.trim())) {
      err.parentMobile = 'Parent Mobile must be exactly 10 digits.';
    }

    if (!form.address.trim()) {
      err.address = 'Residential Address is required.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    // Save student to storage via Context (strictly without marks)
    const newStudent = {
      ...form,
      marks: {} // Explicit requirement: Marks should NOT be accepted in this page
    };

    addStudent(newStudent);
    setSubmitSuccess(true);

    setTimeout(() => {
      navigate('/students');
    }, 1200);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container form-max-width">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">Enrolment Form</span>
            <h1 className="page-main-title">Add New Student</h1>
            <p className="page-subtitle-text">
              Register a new student profile into EduReport. Academic marks are entered separately in the Marks Portal.
            </p>
          </div>
          <Link to="/students" className="btn-secondary">
            &larr; Back to Students List
          </Link>
        </div>

        {/* Success Alert Banner */}
        {submitSuccess && (
          <div className="alert-banner alert-success animate-fade">
            <span className="alert-icon">🎉</span>
            <div>
              <strong>Student Profile Registered Successfully!</strong>
              <p>Saving records to local storage and redirecting to the student directory...</p>
            </div>
          </div>
        )}

        {/* Global Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="alert-banner alert-error animate-fade">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Please correct the errors in the form before submitting.</strong>
              <p>Review the highlighted fields below and ensure all required information is provided.</p>
            </div>
          </div>
        )}

        {/* Two-Column Form */}
        <form onSubmit={handleSubmit} className="student-form-card" noValidate>
          {/* Section 1: Academic & Personal Information */}
          <div className="form-section">
            <div className="form-section-header">
              <span className="section-number">1</span>
              <div>
                <h3>Student Information</h3>
                <p>Personal credentials, institutional identification, and academic assignment.</p>
              </div>
            </div>

            <div className="form-grid-two">
              {/* Student Name */}
              <div className="form-group">
                <label htmlFor="name">
                  Full Name <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Nishanth M S"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                  />
                </div>
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              {/* Student ID */}
              <div className="form-group">
                <label htmlFor="studentId">
                  Student ID <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🆔</span>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    placeholder="e.g. PDK-CSE-2023-042"
                    value={form.studentId}
                    onChange={handleChange}
                    className={`form-input ${errors.studentId ? 'input-error' : ''}`}
                  />
                </div>
                {errors.studentId && <span className="field-error-text">{errors.studentId}</span>}
              </div>

              {/* Roll Number */}
              <div className="form-group">
                <label htmlFor="rollNumber">
                  Roll Number <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🔢</span>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="e.g. 23CSE042"
                    value={form.rollNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.rollNumber ? 'input-error' : ''}`}
                  />
                </div>
                {errors.rollNumber && <span className="field-error-text">{errors.rollNumber}</span>}
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label htmlFor="dob">
                  Date of Birth <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📅</span>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className={`form-input ${errors.dob ? 'input-error' : ''}`}
                  />
                </div>
                {errors.dob && <span className="field-error-text">{errors.dob}</span>}
              </div>

              {/* Gender */}
              <div className="form-group">
                <label htmlFor="gender">
                  Gender <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">⚥</span>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Class */}
              <div className="form-group">
                <label htmlFor="className">
                  Class / Degree <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🎓</span>
                  <select
                    id="className"
                    name="className"
                    value={form.className}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="1st Year B.E.">1st Year B.E.</option>
                    <option value="2nd Year B.E.">2nd Year B.E.</option>
                    <option value="3rd Year B.E.">3rd Year B.E.</option>
                    <option value="4th Year B.E.">4th Year B.E.</option>
                  </select>
                </div>
              </div>

              {/* Section */}
              <div className="form-group">
                <label htmlFor="section">
                  Section <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🏷️</span>
                  <select
                    id="section"
                    name="section"
                    value={form.section}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              {/* Department */}
              <div className="form-group">
                <label htmlFor="department">
                  Department <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">🏛️</span>
                  <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Communication">Electronics &amp; Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
              </div>

              {/* Academic Year */}
              <div className="form-group">
                <label htmlFor="academicYear">
                  Academic Year <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📆</span>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={form.academicYear}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Guardian Information */}
          <div className="form-section" style={{ marginTop: '2rem' }}>
            <div className="form-section-header">
              <span className="section-number">2</span>
              <div>
                <h3>Contact &amp; Guardian Information</h3>
                <p>Residential coordinates and parent / emergency communication channels.</p>
              </div>
            </div>

            <div className="form-grid-two">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Student Email Address <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="student@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                </div>
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="mobile">
                  Student Mobile (10 Digits) <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    maxLength="10"
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={handleChange}
                    className={`form-input ${errors.mobile ? 'input-error' : ''}`}
                  />
                </div>
                {errors.mobile && <span className="field-error-text">{errors.mobile}</span>}
              </div>

              {/* Parent Name */}
              <div className="form-group">
                <label htmlFor="parentName">
                  Parent / Guardian Name <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">👨‍👩‍👧</span>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    placeholder="e.g. M. Shanmugam"
                    value={form.parentName}
                    onChange={handleChange}
                    className={`form-input ${errors.parentName ? 'input-error' : ''}`}
                  />
                </div>
                {errors.parentName && <span className="field-error-text">{errors.parentName}</span>}
              </div>

              {/* Parent Mobile */}
              <div className="form-group">
                <label htmlFor="parentMobile">
                  Parent Mobile (10 Digits) <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">📞</span>
                  <input
                    type="tel"
                    id="parentMobile"
                    name="parentMobile"
                    maxLength="10"
                    placeholder="9840123456"
                    value={form.parentMobile}
                    onChange={handleChange}
                    className={`form-input ${errors.parentMobile ? 'input-error' : ''}`}
                  />
                </div>
                {errors.parentMobile && <span className="field-error-text">{errors.parentMobile}</span>}
              </div>
            </div>

            {/* Address */}
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label htmlFor="address">
                Residential Address <span className="req-star">*</span>
              </label>
              <div className="input-wrap">
                <span className="input-icon">🏠</span>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street address, City, District, PIN Code"
                  value={form.address}
                  onChange={handleChange}
                  className={`form-input ${errors.address ? 'input-error' : ''}`}
                />
              </div>
              {errors.address && <span className="field-error-text">{errors.address}</span>}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="form-actions-footer">
            <div className="notice-note">
              <span>ℹ️</span> <strong>Note:</strong> Subject marks cannot be entered on this page. After saving the student profile, visit the <em>Marks Entry</em> page to submit assessment scores.
            </div>

            <div className="form-buttons-cluster">
              <button
                type="button"
                className="btn-form-cancel"
                onClick={() => navigate('/students')}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-form-reset"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="btn-form-submit"
                disabled={submitSuccess}
              >
                💾 Save Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentPage;
