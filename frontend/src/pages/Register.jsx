import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      await register(
        form.name,
        form.email,
        form.password
      );

      navigate('/login', {
        state: {
          message: 'Registration successful. Please login.',
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >
        <h1>Create account</h1>

        <p>
          Join Exploregypt and save the places you love.
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <label>
          Name

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </label>

        <label>
          Email

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}