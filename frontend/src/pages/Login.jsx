import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p>Login to save your favorite places.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </main>
  );
}
