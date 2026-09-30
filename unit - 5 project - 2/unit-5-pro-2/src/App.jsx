import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TaskModal from './components/TaskModal';

// Pages
import Dashboard from './pages/Dashboard';
import DailyDiary from './pages/DailyDiary';
import WeeklyViewPage from './pages/WeeklyView';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import CalendarPage from './pages/CalendarPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Import CSS Design System
import './styles/global.css';
import './styles/dashboard.css';
import './styles/tasks.css';
import './styles/calendar.css';
import './styles/responsive.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const location = useLocation();

  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      {/* Responsive Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Viewport */}
      <div className="main-content-wrapper">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenAddTask={() => setIsQuickAddOpen(true)}
        />

        <main className="main-scroll-view">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diary" element={<DailyDiary />} />
            <Route path="/weekly" element={<WeeklyViewPage />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Quick Add Task Modal */}
      <TaskModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
