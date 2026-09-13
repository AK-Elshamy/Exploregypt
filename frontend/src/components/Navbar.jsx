import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Exploregypt</Link>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cities">Cities</NavLink>
        <NavLink to="/places">Places</NavLink>
        {isAuthenticated && <NavLink to="/favorites">Favorites</NavLink>}
        {isAuthenticated ? (
          <>
            <span className="nav-user">Hi, {user?.name}</span>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
