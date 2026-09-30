import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEdu } from '../context/EduContext';
import {
  ViewStudentModal,
  EditStudentModal,
  DeleteConfirmModal
} from '../components/StudentModals';

function StudentsPage() {
  const { students, removeStudent, updateStudent } = useEdu();
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [resultFilter, setResultFilter] = useState('ALL');

  // Modal State
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Filtered List
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Search by name or roll number
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNumber.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q);

      // Class filter
      const matchClass = classFilter === 'ALL' || s.className === classFilter;

      // Section filter
      const matchSection = sectionFilter === 'ALL' || s.section === sectionFilter;

      // Result filter
      const res = s.metrics ? s.metrics.result : 'Pending';
      const matchResult = resultFilter === 'ALL' || res === resultFilter;

      return matchSearch && matchClass && matchSection && matchResult;
    });
  }, [students, searchTerm, classFilter, sectionFilter, resultFilter]);

  const handleDeleteConfirm = (id) => {
    removeStudent(id);
    setDeletingStudent(null);
  };

  const handleEditSave = (updatedData) => {
    updateStudent(updatedData);
    setEditingStudent(null);
  };

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header */}
        <div className="page-header-row">
          <div>
            <div className="flex-align-center gap-2">
              <span className="page-category-badge">Roster Management</span>
              <span className="count-pill">{students.length} Total Students</span>
            </div>
            <h1 className="page-main-title">Student Management</h1>
            <p className="page-subtitle-text">
              View, search, filter, update, or remove enrolled students, and inspect individual academic progress.
            </p>
          </div>

          <div className="header-quick-actions">
            <Link to="/add-student" className="btn-primary">
              <span>+</span> Add Student
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="filter-card">
          <div className="filter-grid">
            {/* Search Input */}
            <div className="filter-field search-field">
              <label>Search Student Name or Roll Number</label>
              <div className="input-with-icon">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="e.g. Nishanth or 23CSE042..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
                {searchTerm && (
                  <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
                )}
              </div>
            </div>

            {/* Class Filter */}
            <div className="filter-field">
              <label>Filter by Class</label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Classes</option>
                <option value="1st Year B.E.">1st Year B.E.</option>
                <option value="2nd Year B.E.">2nd Year B.E.</option>
                <option value="3rd Year B.E.">3rd Year B.E.</option>
                <option value="4th Year B.E.">4th Year B.E.</option>
              </select>
            </div>

            {/* Section Filter */}
            <div className="filter-field">
              <label>Filter by Section</label>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            {/* Result Filter */}
            <div className="filter-field">
              <label>Filter by Result</label>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Results</option>
                <option value="PASS">PASS Only</option>
                <option value="FAIL">FAIL Only</option>
                <option value="Pending">Marks Pending</option>
              </select>
            </div>
          </div>

          <div className="filter-summary-row">
            <span>Showing <strong>{filteredStudents.length}</strong> of {students.length} students</span>
            {(searchTerm || classFilter !== 'ALL' || sectionFilter !== 'ALL' || resultFilter !== 'ALL') && (
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setClassFilter('ALL');
                  setSectionFilter('ALL');
                  setResultFilter('ALL');
                }}
              >
                Reset All Filters ↻
              </button>
            )}
          </div>
        </div>

        {/* Student Table */}
        <div className="dash-table-card" style={{ marginTop: '1.5rem' }}>
          {filteredStudents.length === 0 ? (
            <div className="empty-state-box">
              <div className="empty-icon">📂</div>
              <h3>No Students Found</h3>
              <p>No student records matched your search/filter criteria. Try changing filters or register a new student.</p>
              <Link to="/add-student" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Add New Student
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="edu-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Result</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <span className="code-badge">{s.rollNumber}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.studentId}</div>
                      </td>
                      <td>
                        <div className="student-name-cell">
                          <div className="avatar-circle">{s.name.charAt(0)}</div>
                          <div>
                            <strong>{s.name}</strong>
                            <span className="small-dept">{s.department}</span>
                          </div>
                        </div>
                      </td>
                      <td>{s.className}</td>
                      <td>
                        <span className="section-badge">Sec {s.section}</span>
                      </td>
                      <td>
                        <strong>
                          {s.metrics && s.metrics.hasMarks ? `${s.metrics.percentage}%` : '—'}
                        </strong>
                      </td>
                      <td>
                        <span className={`grade-tag grade-${s.metrics && s.metrics.grade ? s.metrics.grade.replace('+', '-plus') : 'na'}`}>
                          {s.metrics && s.metrics.grade ? s.metrics.grade : '—'}
                        </span>
                      </td>
                      <td>
                        {s.metrics && s.metrics.hasMarks ? (
                          <span className={`status-pill ${s.metrics.result === 'PASS' ? 'pill-pass' : 'pill-fail'}`}>
                            {s.metrics.result}
                          </span>
                        ) : (
                          <span className="status-pill pill-pending">Pending</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons-group">
                          <button
                            title="View Student Details"
                            className="btn-action-icon btn-view"
                            onClick={() => setViewingStudent(s)}
                          >
                            👁️ View
                          </button>

                          <button
                            title="Edit Student Info"
                            className="btn-action-icon btn-edit"
                            onClick={() => setEditingStudent(s)}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            title="Delete Student"
                            className="btn-action-icon btn-delete"
                            onClick={() => setDeletingStudent(s)}
                          >
                            🗑️ Delete
                          </button>

                          <button
                            title="View Official Report Card"
                            className="btn-action-icon btn-report"
                            onClick={() => navigate(`/report/${s.id}`)}
                          >
                            📄 Report
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ViewStudentModal
        student={viewingStudent}
        onClose={() => setViewingStudent(null)}
        onGoToReport={(id) => {
          setViewingStudent(null);
          navigate(`/report/${id}`);
        }}
      />

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleEditSave}
      />

      <DeleteConfirmModal
        student={deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default StudentsPage;
