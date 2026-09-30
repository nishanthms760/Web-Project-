import { useState } from 'react';
import { skillsData } from '../data/portfolioData';

function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: 'All Technical Skills' },
    { id: 'programming', label: 'Programming & Core' },
    { id: 'webDevelopment', label: 'Web Development' },
    { id: 'database', label: 'Database & SQL' },
    { id: 'tools', label: 'Developer Tools' },
    { id: 'currentlyLearning', label: '🚀 Currently Learning' },
  ];

  // Consolidate list for filtering
  const getAllSkills = () => {
    let list = [];
    if (activeTab === 'all' || activeTab === 'programming') {
      list = list.concat(skillsData.programming.map(s => ({ ...s, category: 'Programming' })));
    }
    if (activeTab === 'all' || activeTab === 'webDevelopment') {
      list = list.concat(skillsData.webDevelopment.map(s => ({ ...s, category: 'Web Development' })));
    }
    if (activeTab === 'all' || activeTab === 'database') {
      list = list.concat(skillsData.database.map(s => ({ ...s, category: 'Database' })));
    }
    if (activeTab === 'all' || activeTab === 'tools') {
      list = list.concat(skillsData.tools.map(s => ({ ...s, category: 'Tools' })));
    }
    return list;
  };

  const filteredSkills = getAllSkills().filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.note && s.note.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Expertise</span>
          <h2 className="section-title">Technical Capabilities</h2>
          <p className="section-subtitle">
            Strong foundation in algorithms, modern frontend frameworks, and clean software engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`skill-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input for skills */}
        {activeTab !== 'currentlyLearning' && (
          <div style={{ maxWidth: '400px', margin: '0 auto 2rem auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search skill (e.g. React, Java, SQL, Git)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
              🔍
            </span>
          </div>
        )}

        {/* Skill Cards Display */}
        {activeTab === 'currentlyLearning' ? (
          <div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Technologies and domains I am actively expanding my knowledge in right now:
            </p>
            <div className="learning-grid">
              {skillsData.currentlyLearning.map((item, idx) => (
                <div key={idx} className="learning-card">
                  <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>
                  <span className="learning-badge">IN PROGRESS</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill, idx) => (
              <div key={idx} className="skill-item-card">
                <div className="skill-card-top">
                  <div className="skill-name-wrap">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-title">{skill.name}</span>
                  </div>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-meter-bg">
                  <div
                    className="skill-meter-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-note">{skill.note}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
