import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="compact-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <div className="brand-dot"></div>
          <span className="brand-title">Form<span className="brand-accent">Craft</span></span>
          <span className="unit-pill">Unit 4 &bull; Pro 1</span>
        </Link>

        <nav className="compact-nav">
          <Link 
            to="/" 
            className={`nav-btn ${location.pathname === '/' || location.pathname === '/register' ? 'active' : ''}`}
          >
            Registration Form
          </Link>
          <Link 
            to="/success" 
            className={`nav-btn ${location.pathname === '/success' ? 'active' : ''}`}
          >
            Receipt
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
