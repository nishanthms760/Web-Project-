import { Link } from 'react-router-dom';

const features = [
  {
    number: "01",
    title: "Real-time validation",
    description: "Touched-field validation provides instant, constructive feedback without overwhelming the user during entry.",
    tag: "UX Feedback"
  },
  {
    number: "02",
    title: "Dependent location",
    description: "Strict hierarchical state, district, and city relationships dynamically eliminate impossible spatial combinations.",
    tag: "Data Flow"
  },
  {
    number: "03",
    title: "City autocomplete",
    description: "Typeahead suggestions with keyboard-navigable filtering streamline searching through extensive urban indexes.",
    tag: "Search / Filter"
  },
  {
    number: "04",
    title: "Pincode intelligence",
    description: "An integrated geographic dataset cross-verifies postal codes against selected administrative boundaries in real time.",
    tag: "Cross Validation"
  },
  {
    number: "05",
    title: "Password strength",
    description: "Dynamic entropy analysis and visual rule checklist empower users to formulate cryptographically robust credentials.",
    tag: "Security"
  },
  {
    number: "06",
    title: "Image validation",
    description: "Deep client-side checks inspect MIME types, byte payloads (<2MB), and natural pixel dimensions before upload.",
    tag: "File Analyzer"
  },
  {
    number: "07",
    title: "Accessible controls",
    description: "Semantic labels, focus rings, WCAG 2.1 contrast ratios, and ARIA live regions safeguard complete accessibility.",
    tag: "A11y Standards"
  },
  {
    number: "08",
    title: "Cross-field checks",
    description: "Correlated inputs such as credential confirmations and matching state-pincode pairs validate harmoniously.",
    tag: "State Machine"
  }
];

const highlights = [
  { label: "React Form Engine", val: "Controlled State" },
  { label: "Validation Pipeline", val: "Real-Time / OnBlur" },
  { label: "Spatial Hierarchy", val: "State ➔ Dist ➔ City" },
  { label: "Media Parser", val: "Client Dimension Check" }
];

function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Background Decorative Gradients */}
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-container hero-grid">
          <div className="hero-content">
            <div className="eyebrow-container">
              <span className="eyebrow-badge">
                <span className="eyebrow-dot"></span>
                Frontend Form Architecture
              </span>
              <span className="eyebrow-sub">Vite + React 19</span>
            </div>

            <h1 className="hero-title">
              Professional User Registration
              <span className="gradient-text"> &amp; Validation System</span>
            </h1>

            <p className="hero-description">
              A production-ready React form application engineered to demonstrate reactive field validation,
              multi-level dependent location chaining, typeahead city autocomplete, password entropy analysis,
              client-side image dimension verification, and resilient data handling.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn-primary-glow">
                <span>Start Registration</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <a href="#features" className="btn-glass">
                Explore Architecture
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-metrics">
              {highlights.map((h, i) => (
                <div key={i} className="metric-item">
                  <span className="metric-label">{h.label}</span>
                  <span className="metric-val">{h.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-aside">
            <div className="glass-card demo-card">
              <div className="card-header-bar">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="card-tag">Architecture Matrix</span>
              </div>

              <h2 className="demo-panel-title">What this system demonstrates</h2>
              
              <div className="demo-list">
                {[
                  "Controlled React state with zero latency",
                  "Modular decoupled validation architecture",
                  "Hierarchical State ➔ District ➔ City flow",
                  "Active pincode geographic cross-verification",
                  "Live password strength evaluator & checklist",
                  "Asynchronous client-side file inspection & preview",
                  "Accessible ARIA alerts and keyboard support"
                ].map((item, idx) => (
                  <div className="demo-row" key={idx}>
                    <div className="check-bubble">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="demo-text">{item}</span>
                  </div>
                ))}
              </div>

              <div className="demo-card-footer">
                <div className="mini-badge">
                  <span className="pulse-indicator"></span>
                  Ready to test with zero backend dependency
                </div>
                <Link to="/register" className="inline-action-link">
                  Launch Demo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Features Section */}
      <section className="features-section" id="features">
        <div className="content-container">
          <div className="section-header">
            <span className="section-pill">Core Engineering</span>
            <h2 className="section-heading">Built Around Real-World Form Principles</h2>
            <p className="section-subheading">
              The interface purposefully separates UI representation, validation schema rules, geographic datasets,
              and asynchronous utilities so the project remains clean, modular, and maintainable.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feat) => (
              <article className="feature-card" key={feat.number}>
                <div className="feature-top">
                  <div className="feature-number">{feat.number}</div>
                  <span className="feature-tag">{feat.tag}</span>
                </div>
                <h3 className="feature-card-title">{feat.title}</h3>
                <p className="feature-card-desc">{feat.description}</p>
                <div className="feature-card-bottom-line"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-section">
        <div className="content-container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Ready to experience the interactive form system?</h2>
              <p>Test real-time validation, location cascading, and password security analysis.</p>
            </div>
            <Link to="/register" className="btn-primary-glow btn-large">
              <span>Open Registration Portal</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
