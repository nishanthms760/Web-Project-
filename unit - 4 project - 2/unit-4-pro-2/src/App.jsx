import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ArchitectureModal from './components/ArchitectureModal';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme-mode') || 'dark';
  });

  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      {/* Background ambient lighting orbs */}
      <div className="bg-ambient">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
        <div className="glow-orb-3"></div>
      </div>

      {/* Projects Portal Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Dedicated Projects Showcase Page */}
      <main>
        <Projects onOpenArchitecture={() => setIsArchitectureOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* System Architecture Modal for Flagship Hackathon Project */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}

export default App;
