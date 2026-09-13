import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCity, getPlaces } from '../services/api';
import PlaceCard from '../components/PlaceCard';

export default function CityDetail() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getCity(id), getPlaces({ city: id, limit: 50 })])
      .then(([cityData, placesData]) => {
        setCity(cityData.data);
        setPlaces(placesData.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load this city.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading"><div className="loading-spinner" /><p>Loading city...</p></div>;
  if (error || !city) return <div className="empty"><h2>{error || 'City not found'}</h2><Link to="/cities" className="btn btn-outline">Back to Cities</Link></div>;

  return (
    <main className="section page-shell">
      <div className="container">
        <div className="city-detail-hero">
          <img src={city.image} alt={city.name} />
          <div><p className="eyebrow">{city.region || 'Egypt'}</p><h1>{city.name}</h1><p>{city.description}</p></div>
        </div>
        <div className="section-title"><h2>Places in {city.name}</h2><p>{places.length} places found.</p></div>
        {places.length ? <div className="grid grid-3">{places.map((place) => <PlaceCard key={place._id} place={place} />)}</div> : <div className="empty-state"><p>No places have been added for this city yet.</p></div>}
      </div>
    </main>
  );
}
