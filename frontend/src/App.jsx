import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Favorites from './pages/Favorites';
import SearchFilters from './components/SearchFilters';
import PlaceResults from './components/PlaceResults';

import { getPlaces } from './services/api';

import './index.css';

function Home() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    category: '',
    sort: '',
  });

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPlaces({
          search: filters.search,
          city: filters.city,
          category: filters.category,
          sort: filters.sort,
          limit: 50,
        });

        setPlaces(data.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load places. Please try again.');
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPlaces, 300);

    return () => clearTimeout(timer);
  }, [
    filters.search,
    filters.city,
    filters.category,
    filters.sort,
  ]);

  return (
    <main>
      <h1>Explore Egypt</h1>
      <p>Discover amazing places across Egypt</p>

      <SearchFilters onFiltersChange={handleFiltersChange} />

      {loading ? (
        <p>Loading places...</p>
      ) : error ? (
        <div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      ) : (
        <PlaceResults places={places} />
      )}
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;