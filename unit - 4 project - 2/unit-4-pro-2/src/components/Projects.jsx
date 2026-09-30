import { useState, useMemo } from 'react';
import { allProjects } from '../data/portfolioData';

function Projects({ onOpenArchitecture }) {
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: `All Projects (${allProjects.length})` },
    { id: 'unit-5', label: 'Unit 5 (StudyFlow & EduGrade)' },
    { id: 'unit-4', label: 'Unit 4 (KYC Verification)' },
    { id: 'unit-3', label: 'Unit 3 (Calculator & Attendance)' },
    { id: 'unit-2', label: 'Unit 2 (Hobby & Profile)' },
    { id: 'unit-1', label: 'Unit 1 (Grade & Counter)' },
    { id: 'hackathon', label: 'SIH 2026 Hackathon' },
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesUnit = selectedUnit === 'all' || project.unit === selectedUnit;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q)) ||
        project.badge.toLowerCase().includes(q);

      return matchesUnit && matchesSearch;
    });
  }, [selectedUnit, searchQuery]);

  return (
    <section id="projects" className="projects-section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        {/* Main Portal Header */}
        <div className="section-header" style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <div className="status-pill" style={{ margin: '0 auto 1.25rem auto' }}>
            <span className="status-indicator-dot"></span>
            <span>100% Deployed &bull; All Projects Live on GitHub Pages</span>
          </div>

          <h1 className="section-title" style={{ fontSize: '3.2rem', marginBottom: '1rem' }}>
            Web Engineering &amp; <span className="gradient-text">Software Projects</span>
          </h1>

          <p className="section-subtitle" style={{ fontSize: '1.15rem' }}>
            Explore the complete repository of <strong>10 deployed applications</strong> engineered across 5 academic units and national hackathons by <strong>Nishanth M S</strong>. Every project is running live — click <strong>Launch Live Demo</strong> to test any application instantly.
          </p>

          {/* Quick Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              backdropFilter: 'blur(12px)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div>
              <span className="stat-val gradient-text" style={{ fontSize: '2rem' }}>10</span>
              <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Live Hosted Apps
              </span>
            </div>
            <div>
              <span className="stat-val gradient-text" style={{ fontSize: '2rem' }}>5</span>
              <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Academic Units
              </span>
            </div>
            <div>
              <span className="stat-val gradient-text" style={{ fontSize: '2rem' }}>8.6</span>
              <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                B.E. CSE CGPA
              </span>
            </div>
            <div>
              <span className="stat-val gradient-text" style={{ fontSize: '2rem', color: 'var(--accent-emerald)' }}>100%</span>
              <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                Verified Status
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div style={{ marginBottom: '3rem' }}>
          {/* Search Box */}
          <div style={{ maxWidth: '540px', margin: '0 auto 1.5rem auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search projects by name, unit, or technology (e.g. React, Timer, KYC, Calculator)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', height: '48px', fontSize: '0.95rem' }}
            />
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.1rem',
                opacity: 0.6
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 800
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Unit Filter Tabs */}
          <div className="skills-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedUnit(tab.id)}
                className={`skill-tab-btn ${selectedUnit === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Showing <strong>{filteredProjects.length}</strong> of {allProjects.length} projects
          </span>
          {searchQuery && (
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>
              Filtered by: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'var(--bg-card)',
              border: '1px dashed var(--border-card)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔎</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              No projects matched your search
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Try searching with different keywords like "React", "Unit", "Timer", or "HTML".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedUnit('all');
              }}
              className="btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="featured-projects-container" style={{ gap: '2rem' }}>
            {filteredProjects.map((project) => (
              <article key={project.id} className="featured-project-card">
                <div className="project-card-inner">
                  {/* Meta Bar */}
                  <div className="project-meta-top">
                    <span className="project-badge-pill">{project.badge}</span>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      {project.demoUrl ? (
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                          ● Live Hosted
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                          ● Flagship Hackathon
                        </span>
                      )}
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        Repo: nishanthms760
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="project-title" style={{ fontSize: '1.85rem' }}>
                      {project.title}
                    </h2>
                    <p className="project-sub">{project.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="project-desc">{project.description}</p>

                  {/* Features Checklist */}
                  <div className="project-features-list">
                    {project.features.map((feature, fIdx) => (
                      <div key={fIdx} className="feature-bullet">
                        <span className="feature-check">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-live-demo"
                        title={`Open live demo of ${project.title}`}
                      >
                        <span>🚀</span> Launch Live Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github"
                      >
                        <span>🐙</span> Source Code / Repo
                      </a>
                    )}

                    {project.id === 'sih-26188' && (
                      <button
                        onClick={onOpenArchitecture}
                        className="btn-secondary"
                        style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-secondary)' }}
                      >
                        <span>🔍</span> System Architecture &amp; Workflow
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
