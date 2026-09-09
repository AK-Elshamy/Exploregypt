import { useEffect, useState } from 'react';
import { getPlaces, getCities } from '../services/api';
import PlaceCard from '../components/PlaceCard';

const CATEGORIES = ['Historical', 'Museum', 'Beach', 'Nature', 'Religious', 'Entertainment', 'Shopping', 'Other'];

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPlaces = () => {
    setLoading(true);
    const params = { limit: 50 };
    if (search) params.search = search;
    if (city) params.city = city;
    if (category) params.category = category;

    getPlaces(params)
      .then((res) => {
        setPlaces(res.data.data || []);
        setTotal(res.data.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCities().then((res) => setCities(res.data.data || [])).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(timer);
  }, [search, city, category]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Tourist Places</h2>
          <p>Search and filter attractions across Egypt</p>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : places.length === 0 ? (
          <div className="empty">No places found matching your filters.</div>
        ) : (
          <>
            <p style={{ marginBottom: '1rem', color: 'var(--gray)' }}>{total} places found</p>
            <div className="grid grid-3">
              {places.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
