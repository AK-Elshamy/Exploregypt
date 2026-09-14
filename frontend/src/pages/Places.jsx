import { useEffect, useState } from 'react';
import { getPlaces } from '../services/api';
import PlaceCard from '../components/PlaceCard';

const CATEGORIES = [
  { value: '', label: 'All', icon: '✨' },
  { value: 'Historical', label: 'Historical', icon: '🏛️' },
  { value: 'Museum', label: 'Museums', icon: '🏺' },
  { value: 'Nature', label: 'Nature', icon: '🌿' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎭' },
  { value: 'Beach', label: 'Beaches', icon: '🏖️' },
  { value: 'Restaurant', label: 'Restaurants', icon: '🍽️' },
  { value: 'Hotel', label: 'Hotels', icon: '🏨' },
  { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'Other', label: 'Other', icon: '📍' },
];

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);

        const params = {
          limit: 50,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (category) {
          params.category = category;
        }

        const data = await getPlaces(params);

        setPlaces(data.data || []);
      } catch (error) {
        console.error('Failed to load places:', error);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPlaces, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  const selectedCategory = CATEGORIES.find(
    (item) => item.value === category
  );

  return (
    <main className="places-page">

      {/* Hero */}
      <section className="places-hero">
        <div className="container">
          <span className="eyebrow">EXPLORE EGYPT</span>

          <h1>
            Find your next
            <span> adventure.</span>
          </h1>

          <p>
            Discover the best restaurants, hotels, shopping destinations
            and beaches across Egypt.
          </p>
        </div>
      </section>

      <section className="places-content">
        <div className="container">

          {/* Search */}
          <div className="places-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="category-filter">
            {CATEGORIES.map((item) => (
              <button
                key={item.value}
                className={`category-chip ${
                  category === item.value ? 'active' : ''
                }`}
                onClick={() => setCategory(item.value)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Results Header */}
          {!loading && (
            <div className="places-header">
              <div>
                <h2>
                  {category
                    ? selectedCategory?.label
                    : 'All Places'}
                </h2>

                <p>
                  {places.length} places found
                </p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="places-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="place-skeleton" key={item}>
                  <div className="skeleton-image"></div>

                  <div className="skeleton-content">
                    <div className="skeleton-line small"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line medium"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : places.length === 0 ? (
            <div className="places-empty">
              <div className="empty-icon">🔎</div>

              <h3>No places found</h3>

              <p>
                Try another search or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch('');
                  setCategory('');
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="places-grid">
              {places.map((place) => (
                <PlaceCard
                  key={place._id}
                  place={place}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}