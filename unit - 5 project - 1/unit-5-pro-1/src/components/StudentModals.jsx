import { useState } from 'react';

export function ViewStudentModal({ student, onClose, onGoToReport }) {
  if (!student) return null;

  return (
    <div className="edu-modal-overlay" onClick={onClose}>
      <div className="edu-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-badge">Student Profile</span>
            <h3>{student.name}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        <div className="modal-body-scroll">
          <div className="view-grid-two">
            <div className="view-card">
              <h4>Academic Details</h4>
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Class &amp; Section:</strong> {student.className} - Section {student.section}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Academic Year:</strong> {student.academicYear}</p>
              <p><strong>Date of Birth:</strong> {student.dob}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
            </div>

            <div className="view-card">
              <h4>Contact &amp; Guardian</h4>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Mobile:</strong> +91 {student.mobile}</p>
              <p><strong>Parent / Guardian:</strong> {student.parentName}</p>
              <p><strong>Parent Mobile:</strong> +91 {student.parentMobile}</p>
              <p><strong>Residential Address:</strong> {student.address}</p>
            </div>
          </div>

          <div className="view-card" style={{ marginTop: '1rem' }}>
            <h4>Performance Overview</h4>
            {student.metrics && student.metrics.hasMarks ? (
              <div className="view-stats-row">
                <div>
                  <span className="lbl">Total Marks:</span>
                  <span className="val">{student.metrics.totalMarks} / {student.metrics.maxMarks}</span>
                </div>
                <div>
                  <span className="lbl">Percentage:</span>
                  <span className="val">{student.metrics.percentage}%</span>
                </div>
                <div>
                  <span className="lbl">Grade:</span>
                  <span className="val">{student.metrics.grade}</span>
                </div>
                <div>
                  <span className="lbl">Result:</span>
                  <span className={`val ${student.metrics.result === 'PASS' ? 'text-pass' : 'text-fail'}`}>
                    {student.metrics.result}
                  </span>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Marks have not been entered yet for this student.</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {student.metrics && student.metrics.hasMarks && (
            <button
              onClick={() => onGoToReport(student.id)}
              className="btn-primary"
            >
              📄 View Full Report Card
            </button>
          )}
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}

export function EditStudentModal({ student, onClose, onSave }) {
  if (!student) return null;

  const [form, setForm] = useState({ ...student });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Student Name is required';
    if (!form.studentId.trim()) err.studentId = 'Student ID is required';
    if (!form.rollNumber.trim()) err.rollNumber = 'Roll Number is required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid Email is required';
    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) err.mobile = '10-digit mobile number required';
    if (!form.parentName.trim()) err.parentName = 'Parent name is required';
    if (!form.parentMobile || !/^\d{10}$/.test(form.parentMobile)) err.parentMobile = '10-digit parent mobile required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="edu-modal-overlay" onClick={onClose}>
      <div className="edu-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Student Information</h3>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body-scroll">
          <div className="form-grid-two">
            <div className="form-group">
              <label>Student Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" />
              {errors.name && <span className="err-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Student ID *</label>
              <input type="text" name="studentId" value={form.studentId} onChange={handleChange} className="form-input" />
              {errors.studentId && <span className="err-msg">{errors.studentId}</span>}
            </div>

            <div className="form-group">
              <label>Roll Number *</label>
              <input type="text" name="rollNumber" value={form.rollNumber} onChange={handleChange} className="form-input" />
              {errors.rollNumber && <span className="err-msg">{errors.rollNumber}</span>}
            </div>

            <div className="form-group">
              <label>Class</label>
              <select name="className" value={form.className} onChange={handleChange} className="form-input">
                <option value="1st Year B.E.">1st Year B.E.</option>
                <option value="2nd Year B.E.">2nd Year B.E.</option>
                <option value="3rd Year B.E.">3rd Year B.E.</option>
                <option value="4th Year B.E.">4th Year B.E.</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select name="section" value={form.section} onChange={handleChange} className="form-input">
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" />
              {errors.email && <span className="err-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Mobile Number (10 digits) *</label>
              <input type="tel" name="mobile" maxLength="10" value={form.mobile} onChange={handleChange} className="form-input" />
              {errors.mobile && <span className="err-msg">{errors.mobile}</span>}
            </div>

            <div className="form-group">
              <label>Parent Name *</label>
              <input type="text" name="parentName" value={form.parentName} onChange={handleChange} className="form-input" />
              {errors.parentName && <span className="err-msg">{errors.parentName}</span>}
            </div>

            <div className="form-group">
              <label>Parent Mobile *</label>
              <input type="tel" name="parentMobile" maxLength="10" value={form.parentMobile} onChange={handleChange} className="form-input" />
              {errors.parentMobile && <span className="err-msg">{errors.parentMobile}</span>}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '0.8rem' }}>
            <label>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className="form-input" />
          </div>

          <div className="modal-footer" style={{ marginTop: '1.5rem', padding: 0 }}>
            <button type="submit" className="btn-primary">Save Changes</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ student, onClose, onConfirm }) {
  if (!student) return null;

  return (
    <div className="edu-modal-overlay" onClick={onClose}>
      <div className="edu-modal-box confirm-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Confirm Student Deletion</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Are you sure you want to delete student <strong>{student.name}</strong> ({student.rollNumber})? This will permanently remove their records and marks from localStorage.
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => onConfirm(student.id)}
            className="btn-danger"
          >
            Yes, Delete Student
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}
