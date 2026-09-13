import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchFilters from './components/SearchFilters';
import PlaceResults from './components/PlaceResults';
import { getPlaces } from './services/api';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function Home() {
  const [filters, setFilters] = useState({ search: '', city: '', category: '', sort: '' });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFiltersChange = useCallback((newFilters) => setFilters(newFilters), []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPlaces({ ...filters, limit: 50 });
        setPlaces(data.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load places. Please try again.');
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Discover Egypt</p>
          <h1>Explore Egypt 🇪🇬</h1>
          <p>Find historic sites, beautiful beaches, museums, and unforgettable places across Egypt.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SearchFilters onFiltersChange={handleFiltersChange} />
          {loading ? <div className="loading"><div className="loading-spinner" /><p>Loading places...</p></div> :
            error ? <div className="error-message"><p>{error}</p></div> :
            <PlaceResults places={places} />}
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/:id" element={<CityDetail />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
