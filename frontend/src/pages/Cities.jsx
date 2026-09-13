import { useEffect, useState } from 'react';
import CityCard from '../components/CityCard';
import { getCities } from '../services/api';

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCities()
      .then((data) => setCities(data.data || []))
      .catch((err) => {
        console.error(err);
        setError('Unable to load cities. Please try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section page-shell">
      <div className="container">
        <div className="section-title"><h1>Explore Egyptian Cities</h1><p>Discover destinations across Egypt.</p></div>
        {loading ? <div className="loading"><div className="loading-spinner" /><p>Loading cities...</p></div> :
          error ? <div className="error-message"><p>{error}</p></div> :
          cities.length === 0 ? <div className="empty-state"><p>No cities available yet.</p></div> :
          <div className="grid grid-3">{cities.map((city) => <CityCard key={city._id} city={city} />)}</div>}
      </div>
    </main>
  );
}
