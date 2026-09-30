import { useState } from 'react';
import { featuredProjects, miniProjects } from '../data/portfolioData';

function Projects({ onOpenArchitecture }) {
  const [selectedMini, setSelectedMini] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Engineered real-world applications showcasing full-stack integration, algorithmic verification, and responsive design.
          </p>
        </div>

        {/* Featured Projects Deep Dive Cards */}
        <div className="featured-projects-container">
          {featuredProjects.map((project) => (
            <article key={project.id} className="featured-project-card">
              <div className="project-card-inner">
                <div className="project-meta-top">
                  <span className="project-badge-pill">{project.badge}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
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

                {/* Actions */}
                <div className="project-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github"
                  >
                    <span>🐙</span> GitHub Repository
                  </a>

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
          <span className="section-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            Practice Ecosystem
          </span>
          <h3 style={{ fontSize: '1.8rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
            React Web Projects &amp; Learning Prototypes
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto' }}>
            Modular mini-projects focused on core React paradigms, state management, and network communication patterns.
          </p>
        </div>

        <div className="mini-grid">
          {miniProjects.map((mini) => (
            <div
              key={mini.id}
              className="mini-card"
              onClick={() => setSelectedMini(selectedMini === mini.id ? null : mini.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mini-card-top">
                <div className="mini-category-wrap">
                  <span className="mini-icon">{mini.icon}</span>
                  <span className="mini-category">{mini.category}</span>
                </div>
                <h4 className="mini-title">{mini.title}</h4>
                <p className="mini-desc">{mini.description}</p>
              </div>

              <div className="mini-tags">
                {mini.tech.map((t, idx) => (
                  <span key={idx} className="mini-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
