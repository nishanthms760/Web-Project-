import { createContext, useContext, useState } from 'react';
import {
  getStoredStudents,
  saveStudentToStorage,
  deleteStudentFromStorage,
  saveStudentMarksInStorage,
  SUBJECTS
} from '../data/storage';

const defaultStats = {
  totalStudents: 0,
  passedStudents: 0,
  failedStudents: 0,
  avgPercentage: '0.00',
  highestMark: 0,
  highestPercentage: 0,
  lowestPercentage: 0,
  totalSubjects: SUBJECTS.length
};

const defaultContextValue = {
  students: [],
  stats: defaultStats,
  subjects: SUBJECTS,
  addStudent: () => {},
  updateStudent: () => {},
  removeStudent: () => {},
  updateMarks: () => {},
  getStudentById: () => null
};

const EduContext = createContext(defaultContextValue);

export function EduProvider({ children }) {
  // Initialize synchronously from localStorage so data is ready immediately
  const [students, setStudents] = useState(() => getStoredStudents());

  const addStudent = (studentData) => {
    const updated = saveStudentToStorage(studentData);
    setStudents(updated);
    return updated;
  };

  const updateStudent = (studentData) => {
    const updated = saveStudentToStorage(studentData);
    setStudents(updated);
    return updated;
  };

  const removeStudent = (id) => {
    const updated = deleteStudentFromStorage(id);
    setStudents(updated);
    return updated;
  };

  const updateMarks = (studentId, marksData) => {
    const updated = saveStudentMarksInStorage(studentId, marksData);
    setStudents(updated);
    return updated;
  };

  // Compute live dashboard metrics from current student state
  const studentsWithMarks = students.filter(s => s.metrics && s.metrics.hasMarks);
  const totalStudents = students.length;
  const passedStudents = studentsWithMarks.filter(s => s.metrics.result === 'PASS').length;
  const failedStudents = studentsWithMarks.filter(s => s.metrics.result === 'FAIL').length;

  const avgPercentage = studentsWithMarks.length > 0
    ? (studentsWithMarks.reduce((acc, s) => acc + s.metrics.percentage, 0) / studentsWithMarks.length).toFixed(2)
    : '0.00';

  const highestMark = studentsWithMarks.length > 0
    ? Math.max(...studentsWithMarks.map(s => s.metrics.totalMarks))
    : 0;

  const highestPercentage = studentsWithMarks.length > 0
    ? Math.max(...studentsWithMarks.map(s => s.metrics.percentage))
    : 0;

  const lowestPercentage = studentsWithMarks.length > 0
    ? Math.min(...studentsWithMarks.map(s => s.metrics.percentage))
    : 0;

  const stats = {
    totalStudents,
    passedStudents,
    failedStudents,
    avgPercentage,
    highestMark,
    highestPercentage,
    lowestPercentage,
    totalSubjects: SUBJECTS.length
  };

  const value = {
    students,
    stats,
    subjects: SUBJECTS,
    addStudent,
    updateStudent,
    removeStudent,
    updateMarks,
    getStudentById: (id) => students.find(s => s.id === id || s.rollNumber === id)
  };

  return (
    <EduContext.Provider value={value}>
      {children}
    </EduContext.Provider>
  );
}

export const useEdu = () => useContext(EduContext);
