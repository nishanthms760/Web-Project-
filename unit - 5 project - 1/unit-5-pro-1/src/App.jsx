import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { EduProvider } from './context/EduContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import MarksEntryPage from './pages/MarksEntryPage';
import ReportsPage from './pages/ReportsPage';
import IndividualReportPage from './pages/IndividualReportPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <EduProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="edu-app-root">
          <div className="no-print">
            <Navbar />
          </div>

          <main className="edu-main-viewport">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/add-student" element={<AddStudentPage />} />
              <Route path="/marks" element={<MarksEntryPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/report/:id" element={<IndividualReportPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <div className="no-print">
            <Footer />
          </div>
        </div>
      </HashRouter>
    </EduProvider>
  );
}

export default App;
