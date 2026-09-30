import { stats } from '../data/portfolioData';

function StatsBar() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-val-wrap">
                <span className="stat-val gradient-text">{stat.value}</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-desc">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
