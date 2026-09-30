import { personalInfo } from '../data/portfolioData';

function About() {
  const pillars = [
    {
      icon: "💻",
      title: "Full-Stack & Web Engineering",
      desc: "Designing responsive, user-first interfaces with React, modern CSS, and RESTful architectures backed by structured databases."
    },
    {
      icon: "🧩",
      title: "Algorithms & Core Fundamentals",
      desc: "Strengthening problem solving and object-oriented design in Java and Python with clean architectural practices."
    },
    {
      icon: "🚀",
      title: "Real-World Innovation & SIH",
      desc: "Collaborative builder tackling national challenges like Smart India Hackathon 2026 with end-to-end document authenticity tooling."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Discovery</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate 2nd-Year Computer Science Engineering student engineering scalable and practical solutions.
          </p>
        </div>

        <div className="about-grid">
          {/* Story Narrative */}
          <div className="about-story">
            <p className="about-text">
              {personalInfo.about}
            </p>

            <div className="about-highlights">
              <div className="highlight-box">
                <span className="highlight-icon">🏛️</span>
                <div className="highlight-content">
                  <h4>Institution</h4>
                  <p>{personalInfo.collegeShort}</p>
                </div>
              </div>

              <div className="highlight-box">
                <span className="highlight-icon">🎓</span>
                <div className="highlight-content">
                  <h4>Degree &amp; Year</h4>
                  <p>{personalInfo.year} (Grad: {personalInfo.graduation})</p>
                </div>
              </div>

              <div className="highlight-box">
                <span className="highlight-icon">📍</span>
                <div className="highlight-content">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>

              <div className="highlight-box">
                <span className="highlight-icon">🎯</span>
                <div className="highlight-content">
                  <h4>Career Goal</h4>
                  <p>{personalInfo.careerGoal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars Deck */}
          <div className="about-card-deck">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-icon-box">{pillar.icon}</div>
                <div className="pillar-content">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
