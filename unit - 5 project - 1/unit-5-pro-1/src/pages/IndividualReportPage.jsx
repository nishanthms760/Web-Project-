import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEdu } from '../context/EduContext';
import { SUBJECTS } from '../data/storage';

function IndividualReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById } = useEdu();

  const student = getStudentById(id);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Window print with save as PDF option is standard web behavior
    window.print();
  };

  if (!student) {
    return (
      <div className="edu-page-wrapper">
        <div className="edu-container">
          <div className="empty-state-box">
            <div className="empty-icon">⚠️</div>
            <h2>Student Not Found</h2>
            <p>Could not retrieve record for student ID: <code>{id}</code></p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/reports" className="btn-primary">
                &larr; Back to Report Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const metrics = student.metrics || {
    totalMarks: 0,
    maxMarks: 600,
    percentage: 0,
    average: 0,
    grade: 'N/A',
    result: 'Pending'
  };

  return (
    <div className="report-view-wrapper">
      {/* Non-printing Control Bar */}
      <div className="no-print report-actions-toolbar">
        <div className="edu-container flex-between-center">
          <div className="toolbar-left">
            <button onClick={() => navigate(-1)} className="btn-secondary">
              &larr; Back
            </button>
            <span className="toolbar-student-tag">
              Official Transcript for <strong>{student.name}</strong> ({student.rollNumber})
            </span>
          </div>

          <div className="toolbar-right">
            <button onClick={handlePrint} className="btn-primary btn-print">
              🖨️ Print Report
            </button>
            <button onClick={handleDownloadPDF} className="btn-accent btn-download">
              📥 Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Official Printable Report Card Document Container */}
      <div className="report-paper-container">
        <div className="official-report-card" id="printable-report-area">
          {/* Institutional Header */}
          <div className="report-inst-header">
            <div className="inst-crest">
              <span className="inst-logo-icon">🏛️</span>
            </div>

            <div className="inst-titles">
              <h2 className="inst-title-main">PRINCE DR. K. VASUDEVAN COLLEGE OF ENGINEERING &amp; TECHNOLOGY</h2>
              <p className="inst-affil">Affiliated to Anna University • Approved by AICTE, New Delhi • Accredited 'A' Grade</p>
              <p className="inst-address">Medavakkam - Mambakkam Main Road, Ponmar, Chennai - 600 127</p>
              <div className="report-doc-title-banner">
                <h1>OFFICIAL STUDENT REPORT CARD</h1>
                <span className="exam-session">ACADEMIC YEAR {student.academicYear || '2024-2025'}</span>
              </div>
            </div>

            <div className="inst-seal">
              <div className="seal-circle">
                <span>OFFICIAL</span>
                <strong>SEAL</strong>
                <span>VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="report-rule-line"></div>

          {/* Student Profile Metadata Box */}
          <div className="student-report-meta-box">
            <h3 className="meta-box-header">STUDENT PROFILE &amp; REGISTRATION PARTICULARS</h3>
            <div className="meta-grid">
              <div className="meta-row">
                <span className="meta-lbl">Student Name:</span>
                <span className="meta-val student-name-highlight">{student.name}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Roll Number:</span>
                <span className="meta-val font-mono">{student.rollNumber}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Student ID:</span>
                <span className="meta-val font-mono">{student.studentId}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Class / Course:</span>
                <span className="meta-val">{student.className}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Section:</span>
                <span className="meta-val">Section {student.section}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Department:</span>
                <span className="meta-val">{student.department}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Date of Birth:</span>
                <span className="meta-val">{student.dob}</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Academic Year:</span>
                <span className="meta-val">{student.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Marks Evaluation Table */}
          <div className="report-marks-section">
            <h3 className="meta-box-header">STATEMENT OF COURSE MARKS &amp; ASSESSMENT GRADES</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>S.No</th>
                  <th style={{ width: '27%', textAlign: 'left' }}>Subject Name</th>
                  <th style={{ width: '11%' }}>Internal (20)</th>
                  <th style={{ width: '11%' }}>Assignment (10)</th>
                  <th style={{ width: '11%' }}>Practical (20)</th>
                  <th style={{ width: '11%' }}>Theory (50)</th>
                  <th style={{ width: '10%' }}>Total (100)</th>
                  <th style={{ width: '7%' }}>Grade</th>
                  <th style={{ width: '7%' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((sub, idx) => {
                  const m = (student.marks && student.marks[sub.key]) || {
                    internal: 0,
                    assignment: 0,
                    practical: 0,
                    theory: 0,
                    total: 0,
                    grade: 'F',
                    result: 'FAIL'
                  };

                  return (
                    <tr key={sub.key}>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ textAlign: 'left', fontWeight: '600' }}>{sub.name}</td>
                      <td>{m.internal}</td>
                      <td>{m.assignment}</td>
                      <td>{m.practical}</td>
                      <td>{m.theory}</td>
                      <td style={{ fontWeight: 'bold' }}>{m.total}</td>
                      <td style={{ fontWeight: 'bold' }}>
                        <span className={`print-grade-tag grade-${m.grade.replace('+', '-plus')}`}>
                          {m.grade}
                        </span>
                      </td>
                      <td style={{ fontWeight: 'bold', color: m.result === 'PASS' ? '#15803d' : '#b91c1c' }}>
                        {m.result}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Grid */}
          <div className="performance-summary-container">
            <h3 className="meta-box-header">PERFORMANCE EVALUATION SUMMARY</h3>
            <div className="summary-grid-box">
              <div className="summary-item">
                <span className="sum-lbl">Total Marks Obtained</span>
                <span className="sum-val">{metrics.totalMarks} / {metrics.maxMarks}</span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Maximum Marks</span>
                <span className="sum-val">{metrics.maxMarks}</span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Overall Percentage</span>
                <span className="sum-val">{metrics.percentage}%</span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Subject Average</span>
                <span className="sum-val">{metrics.average}</span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Overall Grade</span>
                <span className="sum-val highlight-grade">{metrics.grade}</span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Overall Result</span>
                <span className={`sum-val font-bold ${metrics.result === 'PASS' ? 'text-pass' : 'text-fail'}`}>
                  {metrics.result}
                </span>
              </div>
              <div className="summary-item">
                <span className="sum-lbl">Class Rank</span>
                <span className="sum-val highlight-rank">Rank #{student.rank || '—'}</span>
              </div>
            </div>
          </div>

          {/* Grading Legend Notice */}
          <div className="grading-scale-legend">
            <span><strong>Grading Criteria:</strong> A+ (90-100%), A (80-89%), B+ (70-79%), B (60-69%), C (50-59%), D (40-49%), F (Below 40% - Fail). Pass threshold is 40% aggregate in each subject.</span>
          </div>

          {/* Signatures Area */}
          <div className="report-signature-area">
            <div className="signature-col">
              <div className="signature-line"></div>
              <span className="signature-title">Class Teacher</span>
              <span className="signature-sub">Date &amp; Initial</span>
            </div>

            <div className="signature-col-center">
              <div className="inst-emboss-stamp">
                <span>OFFICIAL EMBOSSMENT</span>
              </div>
            </div>

            <div className="signature-col">
              <div className="signature-line"></div>
              <span className="signature-title">Principal / Controller of Examinations</span>
              <span className="signature-sub">PDKVCET Campus, Chennai</span>
            </div>
          </div>

          {/* Security Verification Footer */}
          <div className="report-security-footer">
            <span>Document ID: EDU-REP-{student.rollNumber}-{student.id}</span>
            <span>Generated via EduReport Academic Portal &bull; Unit 5 Project 1</span>
            <span>Digitally Verified Academic Record</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualReportPage;
