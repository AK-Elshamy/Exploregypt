import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.status === 401 ? 'Please login to view your favorites.' : 'Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadFavorites();
    else setLoading(false);
  }, [isAuthenticated]);

  const handleRemove = async (placeId) => {
    try {
      await removeFavorite(placeId);
      setFavorites((current) => current.filter((fav) => (fav.placeId?._id || fav.placeId) !== placeId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return <main className="section page-shell"><div className="container"><div className="empty"><h2>Login to see your favorites ❤️</h2><p>Save places while exploring Egypt.</p><Link to="/login" className="btn btn-primary">Login</Link></div></div></main>;
  if (loading) return <div className="loading"><div className="loading-spinner" /><p>Loading your favorites...</p></div>;
  if (error) return <div className="error-message"><p>{error}</p><button className="btn btn-primary" onClick={loadFavorites}>Retry</button></div>;
  if (!favorites.length) return <main className="section page-shell"><div className="container"><div className="empty"><h2>No Favorites Yet ❤️</h2><p>Explore places and save the ones you love.</p><Link to="/places" className="btn btn-primary">Explore Places</Link></div></div></main>;

  return (
    <main className="section page-shell"><div className="container">
      <div className="section-title"><h1>My Favorites</h1><p>Your saved places.</p></div>
      <div className="grid grid-3">
        {favorites.map((fav) => {
          const place = fav.placeId;
          if (!place) return null;
          return <article className="favorite-card" key={fav._id}>
            <img src={place.image} alt={place.name} />
            <div className="card-body"><span className="place-category">{place.category}</span><h3>{place.name}</h3><p className="city">{place.city?.name || 'Egypt'}</p><p className="desc">{place.description}</p><div className="card-actions"><Link to={`/places/${place._id}`} className="btn btn-outline">View</Link><button className="btn btn-danger" onClick={() => handleRemove(place._id)}>Remove</button></div></div>
          </article>;
        })}
      </div>
    </div></main>
  );
}
