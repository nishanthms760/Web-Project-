import { useState } from 'react';
import { featuredProjects, miniProjects } from '../data/portfolioData';

function Projects({ onOpenArchitecture }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFeatured = featuredProjects.filter(p => {
    if (activeFilter === 'featured') return p.id === 'sih-26188';
    if (activeFilter === 'units') return p.id !== 'sih-26188';
    return true;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Practical Engineering</span>
          <h2 className="section-title">Featured Projects &amp; Live Demos</h2>
          <p className="section-subtitle">
            Engineered full-stack applications, interactive academic portals, and security screening systems. Click <strong>Live Demo</strong> to test any application instantly in your browser.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="skills-tabs" style={{ marginBottom: '2.5rem' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className={`skill-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
          >
            All Live Applications ({featuredProjects.length + miniProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('units')}
            className={`skill-tab-btn ${activeFilter === 'units' ? 'active' : ''}`}
          >
            Unit Projects (Live Deployed)
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`skill-tab-btn ${activeFilter === 'featured' ? 'active' : ''}`}
          >
            Hackathon &amp; Flagship
          </button>
        </div>

        {/* Featured Projects Deep Dive Cards */}
        <div className="featured-projects-container">
          {filteredFeatured.map((project) => (
            <article key={project.id} className="featured-project-card">
              <div className="project-card-inner">
                <div className="project-meta-top">
                  <span className="project-badge-pill">{project.badge}</span>
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                    {project.demoUrl && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        ● Live Hosted
                      </span>
                    )}
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      Repo: nishanthms760
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-sub">{project.subtitle}</p>
                </div>

                <p className="project-desc">{project.description}</p>

                {/* Features Checklist Grid */}
                <div className="project-features-list">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="feature-bullet">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
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
                      title="Launch live hosted web application"
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
                      <span>🐙</span> GitHub Repository
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

        {/* Mini Projects / Learning Showcase Section */}
        <div className="mini-projects-header">
          <span
            className="section-badge"
            style={{
              background: 'rgba(6, 182, 212, 0.12)',
              color: 'var(--accent-cyan)',
              borderColor: 'rgba(6, 182, 212, 0.3)'
            }}
          >
            Interactive Ecosystem
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginTop: '0.4rem', marginBottom: '0.5rem' }}>
            Unit Projects &amp; Live Practice Prototypes
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            Modular web applications engineered across Units 1 to 3, deployed with live interactive demonstrations.
          </p>
        </div>

        <div className="mini-grid">
          {miniProjects.map((mini) => (
            <div key={mini.id} className="mini-card">
              <div className="mini-card-top">
                <div className="mini-category-wrap">
                  <span className="mini-icon">{mini.icon}</span>
                  <span className="mini-category">{mini.category}</span>
                </div>
                <h4 className="mini-title">{mini.title}</h4>
                <p className="mini-desc">{mini.description}</p>
              </div>

              <div>
                <div className="mini-tags" style={{ marginBottom: '1rem' }}>
                  {mini.tech.map((t, idx) => (
                    <span key={idx} className="mini-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mini-actions">
                  {mini.demoUrl && (
                    <a
                      href={mini.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-live-demo"
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem' }}
                    >
                      <span>🚀</span> Open Live App
                    </a>
                  )}
                  {mini.github && (
                    <a
                      href={mini.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-github"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      <span>🐙</span> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
