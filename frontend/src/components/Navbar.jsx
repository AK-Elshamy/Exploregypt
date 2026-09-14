import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isDimMode, setIsDimMode] = useState(() => {
    return localStorage.getItem('theme') === 'dim';
  });

  useEffect(() => {
    document.body.classList.toggle('dim-mode', isDimMode);
    localStorage.setItem('theme', isDimMode ? 'dim' : 'light');

    return () => {
      document.body.classList.remove('dim-mode');
    };
  }, [isDimMode]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDimMode((current) => !current);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Exploregypt
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cities">Cities</NavLink>
        <NavLink to="/places">Places</NavLink>
        <NavLink to="/ask">Ask</NavLink>

        {isAuthenticated && (
          <NavLink to="/favorites">Favorites</NavLink>
        )}

        {isAuthenticated ? (
          <>
            <span className="nav-user">Hi, {user?.name}</span>

            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            isDimMode ? 'Switch to light mode' : 'Switch to dim mode'
          }
          title={isDimMode ? 'Light mode' : 'Dim mode'}
        >
          <span className="theme-toggle-icon">
            {isDimMode ? '☀️' : '🌙'}
          </span>

          <span className="theme-toggle-text">
            {isDimMode ? 'Light' : 'Dim'}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;