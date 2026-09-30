// EduReport Data Storage & Academic Grading Utility

export const SUBJECTS = [
  { key: 'tamil', name: 'Tamil' },
  { key: 'english', name: 'English' },
  { key: 'mathematics', name: 'Mathematics' },
  { key: 'physics', name: 'Physics' },
  { key: 'chemistry', name: 'Chemistry' },
  { key: 'computerScience', name: 'Computer Science' }
];

// Grade evaluation: 90-100 A+, 80-89 A, 70-79 B+, 60-69 B, 50-59 C, 40-49 D, <40 F
export const calculateSubjectGrade = (score) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B+';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  return 'F';
};

export const calculateOverallGrade = (pct) => {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 40) return 'D';
  return 'F';
};

// Calculate marks, percentage, average, and result (strict rule: any subject < 40 = FAIL)
export const computeStudentMetrics = (marksObj) => {
  if (!marksObj || Object.keys(marksObj).length === 0) {
    return { hasMarks: false, totalMarks: 0, maxMarks: 600, percentage: 0, average: 0, grade: '—', result: 'Pending' };
  }

  let total = 0;
  let count = 0;
  let hasFail = false;

  SUBJECTS.forEach((sub) => {
    const s = marksObj[sub.key];
    if (s && typeof s.total === 'number') {
      total += s.total;
      count++;
      if (s.total < 40) hasFail = true;
    }
  });

  const maxMarks = SUBJECTS.length * 100;
  const percentage = count > 0 ? parseFloat(((total / maxMarks) * 100).toFixed(2)) : 0;
  const average = count > 0 ? parseFloat((total / count).toFixed(2)) : 0;
  const grade = count === SUBJECTS.length ? calculateOverallGrade(percentage) : '—';
  const result = hasFail ? 'FAIL' : (count === SUBJECTS.length ? 'PASS' : 'Pending');

  return { hasMarks: count > 0, totalMarks: total, maxMarks, percentage, average, grade, result };
};

const INITIAL_STUDENTS = [
  {
    id: "STU001",
    name: "Nishanth M S",
    studentId: "PDK-CSE-2023-042",
    rollNumber: "23CSE042",
    dob: "2005-08-15",
    gender: "Male",
    className: "2nd Year B.E.",
    section: "A",
    department: "Computer Science & Engineering",
    academicYear: "2024-2025",
    email: "nishanthms760@gmail.com",
    mobile: "9876543210",
    parentName: "M. Shanmugam",
    parentMobile: "9840123456",
    address: "12, Anna Salai, Tambaram, Chennai - 600045",
    marks: {
      tamil: { internal: 19, assignment: 10, practical: 19, theory: 46, total: 94, grade: 'A+', result: 'PASS' },
      english: { internal: 18, assignment: 9, practical: 18, theory: 45, total: 90, grade: 'A+', result: 'PASS' },
      mathematics: { internal: 20, assignment: 10, practical: 20, theory: 48, total: 98, grade: 'A+', result: 'PASS' },
      physics: { internal: 17, assignment: 9, practical: 19, theory: 44, total: 89, grade: 'A', result: 'PASS' },
      chemistry: { internal: 18, assignment: 9, practical: 18, theory: 43, total: 88, grade: 'A', result: 'PASS' },
      computerScience: { internal: 20, assignment: 10, practical: 20, theory: 49, total: 99, grade: 'A+', result: 'PASS' }
    }
  },
  {
    id: "STU002",
    name: "Priya Ramanathan",
    studentId: "PDK-CSE-2023-048",
    rollNumber: "23CSE048",
    dob: "2005-04-12",
    gender: "Female",
    className: "2nd Year B.E.",
    section: "A",
    department: "Computer Science & Engineering",
    academicYear: "2024-2025",
    email: "priya.r@example.com",
    mobile: "9876543211",
    parentName: "K. Ramanathan",
    parentMobile: "9840123457",
    address: "45, Gandhi Street, Velachery, Chennai - 600042",
    marks: {
      tamil: { internal: 18, assignment: 9, practical: 18, theory: 44, total: 89, grade: 'A', result: 'PASS' },
      english: { internal: 19, assignment: 10, practical: 19, theory: 46, total: 94, grade: 'A+', result: 'PASS' },
      mathematics: { internal: 19, assignment: 9, practical: 19, theory: 45, total: 92, grade: 'A+', result: 'PASS' },
      physics: { internal: 18, assignment: 9, practical: 18, theory: 43, total: 88, grade: 'A', result: 'PASS' },
      chemistry: { internal: 17, assignment: 9, practical: 19, theory: 43, total: 88, grade: 'A', result: 'PASS' },
      computerScience: { internal: 19, assignment: 10, practical: 20, theory: 47, total: 96, grade: 'A+', result: 'PASS' }
    }
  },
  {
    id: "STU003",
    name: "Rahul Krishnan",
    studentId: "PDK-CSE-2023-055",
    rollNumber: "23CSE055",
    dob: "2005-11-20",
    gender: "Male",
    className: "2nd Year B.E.",
    section: "B",
    department: "Computer Science & Engineering",
    academicYear: "2024-2025",
    email: "rahul.k@example.com",
    mobile: "9876543212",
    parentName: "S. Krishnan",
    parentMobile: "9840123458",
    address: "78, Lake View Road, Porur, Chennai - 600116",
    marks: {
      tamil: { internal: 16, assignment: 8, practical: 16, theory: 38, total: 78, grade: 'B+', result: 'PASS' },
      english: { internal: 17, assignment: 8, practical: 17, theory: 40, total: 82, grade: 'A', result: 'PASS' },
      mathematics: { internal: 18, assignment: 9, practical: 18, theory: 41, total: 86, grade: 'A', result: 'PASS' },
      physics: { internal: 15, assignment: 8, practical: 16, theory: 36, total: 75, grade: 'B+', result: 'PASS' },
      chemistry: { internal: 16, assignment: 8, practical: 16, theory: 38, total: 78, grade: 'B+', result: 'PASS' },
      computerScience: { internal: 18, assignment: 9, practical: 19, theory: 42, total: 88, grade: 'A', result: 'PASS' }
    }
  },
  {
    id: "STU004",
    name: "Deepak Sundar",
    studentId: "PDK-CSE-2023-079",
    rollNumber: "23CSE079",
    dob: "2005-06-30",
    gender: "Male",
    className: "2nd Year B.E.",
    section: "B",
    department: "Computer Science & Engineering",
    academicYear: "2024-2025",
    email: "deepak.s@example.com",
    mobile: "9876543215",
    parentName: "M. Sundaram",
    parentMobile: "9840123461",
    address: "10, Temple Road, Medavakkam, Chennai - 600100",
    marks: {
      tamil: { internal: 12, assignment: 6, practical: 13, theory: 24, total: 55, grade: 'C', result: 'PASS' },
      english: { internal: 14, assignment: 7, practical: 14, theory: 29, total: 64, grade: 'B', result: 'PASS' },
      mathematics: { internal: 8, assignment: 4, practical: 10, theory: 14, total: 36, grade: 'F', result: 'FAIL' },
      physics: { internal: 11, assignment: 6, practical: 12, theory: 22, total: 51, grade: 'C', result: 'PASS' },
      chemistry: { internal: 13, assignment: 6, practical: 13, theory: 26, total: 58, grade: 'C', result: 'PASS' },
      computerScience: { internal: 14, assignment: 7, practical: 14, theory: 32, total: 67, grade: 'B', result: 'PASS' }
    }
  }
];

const STORAGE_KEY = 'edureport_students_data';

export const rankStudents = (students) => {
  const enriched = students.map((s) => ({
    ...s,
    metrics: computeStudentMetrics(s.marks)
  }));

  const sorted = [...enriched].sort((a, b) => {
    if (a.metrics.result === 'PASS' && b.metrics.result !== 'PASS') return -1;
    if (a.metrics.result !== 'PASS' && b.metrics.result === 'PASS') return 1;
    return b.metrics.percentage - a.metrics.percentage;
  });

  return sorted.map((s, idx) => ({
    ...s,
    rank: s.metrics.hasMarks ? idx + 1 : '—'
  }));
};

export const getStoredStudents = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    return rankStudents(INITIAL_STUDENTS);
  }
  try {
    return rankStudents(JSON.parse(data));
  } catch {
    return rankStudents(INITIAL_STUDENTS);
  }
};

export const saveStudentToStorage = (studentData) => {
  const current = getStoredStudents();
  const existingIdx = current.findIndex(s => s.id === studentData.id);
  let updated;

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...updated[existingIdx], ...studentData };
  } else {
    const newStudent = {
      ...studentData,
      id: studentData.id || `STU${Date.now().toString().slice(-4)}`,
      marks: studentData.marks || {}
    };
    updated = [newStudent, ...current];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return rankStudents(updated);
};

export const deleteStudentFromStorage = (studentId) => {
  const current = getStoredStudents();
  const filtered = current.filter(s => s.id !== studentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return rankStudents(filtered);
};

export const saveStudentMarksInStorage = (studentId, marksData) => {
  const current = getStoredStudents();
  const updated = current.map(s => s.id === studentId ? { ...s, marks: marksData } : s);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return rankStudents(updated);
};
