import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEdu } from '../context/EduContext';
import { SUBJECTS, calculateSubjectGrade, calculateOverallGrade } from '../data/storage';

function MarksEntryPage() {
  const { students, updateMarks } = useEdu();
  const navigate = useNavigate();

  // Selected student state
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [marksData, setMarksData] = useState({});
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  // Find currently selected student object
  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  // Initialize marksData template when student changes
  useEffect(() => {
    if (selectedStudent) {
      const initial = {};
      SUBJECTS.forEach((sub) => {
        const existing = selectedStudent.marks && selectedStudent.marks[sub.key];
        if (existing) {
          initial[sub.key] = {
            internal: existing.internal || 0,
            assignment: existing.assignment || 0,
            practical: existing.practical || 0,
            theory: existing.theory || 0
          };
        } else {
          initial[sub.key] = {
            internal: 0,
            assignment: 0,
            practical: 0,
            theory: 0
          };
        }
      });
      setMarksData(initial);
      setSaveStatus(null);
    } else if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(students[0].id);
    }
  }, [selectedStudentId, students]);

  // Handle number input changes with validation (0 <= val <= max)
  const handleScoreChange = (subKey, field, val, maxLimit) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > maxLimit) num = maxLimit;

    setMarksData((prev) => ({
      ...prev,
      [subKey]: {
        ...prev[subKey],
        [field]: num
      }
    }));
  };

  // Computations for each row & summary
  const getRowCalculation = (subKey) => {
    const scores = marksData[subKey] || { internal: 0, assignment: 0, practical: 0, theory: 0 };
    const total = (scores.internal || 0) + (scores.assignment || 0) + (scores.practical || 0) + (scores.theory || 0);
    const grade = calculateSubjectGrade(total);
    const result = total >= 40 ? 'PASS' : 'FAIL';
    return { ...scores, total, grade, result };
  };

  // Aggregate stats across all 6 subjects
  let totalMarks = 0;
  let hasAnyFail = false;
  SUBJECTS.forEach((sub) => {
    const row = getRowCalculation(sub.key);
    totalMarks += row.total;
    if (row.result === 'FAIL') {
      hasAnyFail = true;
    }
  });

  const maxMarks = SUBJECTS.length * 100; // 600
  const percentage = parseFloat(((totalMarks / maxMarks) * 100).toFixed(2));
  const average = parseFloat((totalMarks / SUBJECTS.length).toFixed(2));
  const overallGrade = hasAnyFail ? calculateOverallGrade(percentage) : calculateOverallGrade(percentage);
  const overallResult = hasAnyFail ? 'FAIL' : 'PASS';

  // Save marks to localStorage
  const handleSaveMarks = () => {
    if (!selectedStudent) {
      setSaveStatus('error');
      setStatusMessage('Please select a student first.');
      return;
    }

    const payload = {};
    SUBJECTS.forEach((sub) => {
      payload[sub.key] = getRowCalculation(sub.key);
    });

    updateMarks(selectedStudent.id, payload);
    setSaveStatus('success');
    setStatusMessage(`Marks successfully saved and computed for ${selectedStudent.name}!`);

    setTimeout(() => {
      setSaveStatus(null);
    }, 3500);
  };

  // Reset marks for selected student
  const handleResetMarks = () => {
    const cleared = {};
    SUBJECTS.forEach((sub) => {
      cleared[sub.key] = { internal: 0, assignment: 0, practical: 0, theory: 0 };
    });
    setMarksData(cleared);
    setSaveStatus(null);
  };

  return (
    <div className="edu-page-wrapper">
      <div className="edu-container">
        {/* Header Breadcrumb */}
        <div className="page-header-row">
          <div>
            <span className="page-category-badge">Academic Assessment</span>
            <h1 className="page-main-title">Marks Entry &amp; Evaluation</h1>
            <p className="page-subtitle-text">
              Enter component marks (Internal 20, Assignment 10, Practical 20, Theory 50). System auto-computes subject totals, grades, and fail triggers.
            </p>
          </div>
        </div>

        {/* Student Selector Card */}
        <div className="filter-card" style={{ marginBottom: '1.5rem' }}>
          <div className="marks-selector-row">
            <div className="filter-field student-select-field">
              <label htmlFor="studentDropdown">
                <strong>Select Student for Marks Entry:</strong>
              </label>
              <div className="input-with-icon">
                <span className="search-icon">🎓</span>
                <select
                  id="studentDropdown"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="filter-select large-select"
                >
                  <option value="">-- Choose an Enrolled Student --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.rollNumber} - {s.name} ({s.className})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedStudent && (
              <div className="student-quick-info-pill">
                <span>Selected: <strong>{selectedStudent.name}</strong></span>
                <span className="pill-badge">{selectedStudent.rollNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Alert Notifications */}
        {saveStatus === 'success' && (
          <div className="alert-banner alert-success animate-fade">
            <span className="alert-icon">✅</span>
            <div>
              <strong>Marks Saved Successfully!</strong>
              <p>{statusMessage}</p>
            </div>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="alert-banner alert-error animate-fade">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Operation Failed</strong>
              <p>{statusMessage}</p>
            </div>
          </div>
        )}

        {/* Student Info Card */}
        {selectedStudent ? (
          <>
            <div className="student-profile-summary-card">
              <div className="profile-summary-col">
                <span className="field-lbl">Student Name</span>
                <span className="field-val highlight">{selectedStudent.name}</span>
              </div>
              <div className="profile-summary-col">
                <span className="field-lbl">Roll Number</span>
                <span className="field-val">{selectedStudent.rollNumber}</span>
              </div>
              <div className="profile-summary-col">
                <span className="field-lbl">Class</span>
                <span className="field-val">{selectedStudent.className}</span>
              </div>
              <div className="profile-summary-col">
                <span className="field-lbl">Section</span>
                <span className="field-val">Section {selectedStudent.section}</span>
              </div>
              <div className="profile-summary-col">
                <span className="field-lbl">Academic Year</span>
                <span className="field-val">{selectedStudent.academicYear}</span>
              </div>
            </div>

            {/* Marks Entry Table */}
            <div className="dash-table-card" style={{ marginTop: '1.5rem' }}>
              <div className="table-card-header">
                <div>
                  <h3>Assessment Component Breakdown</h3>
                  <p>Maximum mark breakdown: Internal (20) + Assignment (10) + Practical (20) + Theory (50) = 100 per Subject.</p>
                </div>
                <div className="pass-rule-badge">
                  <span>Pass Threshold: &ge; 40 / 100 per subject</span>
                </div>
              </div>

              <div className="table-responsive">
                <table className="edu-table marks-entry-table">
                  <thead>
                    <tr>
                      <th>Subject Name</th>
                      <th style={{ width: '110px' }}>Internal (20)</th>
                      <th style={{ width: '110px' }}>Assignment (10)</th>
                      <th style={{ width: '110px' }}>Practical (20)</th>
                      <th style={{ width: '110px' }}>Theory (50)</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Total (100)</th>
                      <th style={{ width: '90px', textAlign: 'center' }}>Grade</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBJECTS.map((sub) => {
                      const row = getRowCalculation(sub.key);
                      return (
                        <tr key={sub.key}>
                          <td>
                            <strong>{sub.name}</strong>
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={row.internal}
                              onChange={(e) => handleScoreChange(sub.key, 'internal', e.target.value, 20)}
                              className="mark-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={row.assignment}
                              onChange={(e) => handleScoreChange(sub.key, 'assignment', e.target.value, 10)}
                              className="mark-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={row.practical}
                              onChange={(e) => handleScoreChange(sub.key, 'practical', e.target.value, 20)}
                              className="mark-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              value={row.theory}
                              onChange={(e) => handleScoreChange(sub.key, 'theory', e.target.value, 50)}
                              className="mark-input"
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="mark-total-badge">{row.total}</span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`grade-tag grade-${row.grade.replace('+', '-plus')}`}>
                              {row.grade}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`status-pill ${row.result === 'PASS' ? 'pill-pass' : 'pill-fail'}`}>
                              {row.result}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Automatic Calculation Summary Bar */}
              <div className="marks-summary-dashboard">
                <div className="summary-metric-box">
                  <span className="summary-lbl">Total Marks Obtained</span>
                  <span className="summary-val">{totalMarks} <small>/ {maxMarks}</small></span>
                </div>
                <div className="summary-metric-box">
                  <span className="summary-lbl">Maximum Marks</span>
                  <span className="summary-val">{maxMarks}</span>
                </div>
                <div className="summary-metric-box">
                  <span className="summary-lbl">Overall Percentage</span>
                  <span className="summary-val">{percentage}%</span>
                </div>
                <div className="summary-metric-box">
                  <span className="summary-lbl">Subject Average</span>
                  <span className="summary-val">{average}</span>
                </div>
                <div className="summary-metric-box">
                  <span className="summary-lbl">Overall Grade</span>
                  <span className={`summary-val grade-text-${overallGrade.replace('+', '-plus')}`}>{overallGrade}</span>
                </div>
                <div className="summary-metric-box">
                  <span className="summary-lbl">Overall Result</span>
                  <span className={`summary-val ${overallResult === 'PASS' ? 'text-pass' : 'text-fail'}`}>
                    {overallResult}
                  </span>
                </div>
              </div>

              {hasAnyFail && (
                <div className="failing-warning-banner">
                  <span>⚠️</span>
                  <span><strong>Automatic Failure Rule Applied:</strong> One or more subject totals are below 40 marks. Overall student result is strictly marked as <strong>FAIL</strong>.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="marks-actions-bar">
                <div className="marks-action-left">
                  <button
                    type="button"
                    onClick={handleResetMarks}
                    className="btn-secondary"
                  >
                    ↺ Reset Marks
                  </button>
                </div>

                <div className="marks-action-right">
                  <button
                    type="button"
                    onClick={handleSaveMarks}
                    className="btn-primary"
                  >
                    💾 Save Marks
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleSaveMarks();
                      navigate(`/report/${selectedStudent.id}`);
                    }}
                    className="btn-accent"
                  >
                    📄 Generate Report Card &rarr;
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">👥</div>
            <h3>No Student Selected</h3>
            <p>Please select an enrolled student from the dropdown above to begin marks entry.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarksEntryPage;
