import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addFavorite, getFavorites, getPlace, removeFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function PlaceDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [place, setPlace] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPlace(id);
        setPlace(data.data);
        if (isAuthenticated) {
          const favorites = await getFavorites();
          setIsFav(favorites.some((fav) => (fav.placeId?._id || fav.placeId) === id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isAuthenticated]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) return;
    try {
      setFavLoading(true);
      if (isFav) {
        await removeFavorite(id);
        setIsFav(false);
      } else {
        await addFavorite(id);
        setIsFav(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <div className="loading"><div className="loading-spinner" /><p>Loading place...</p></div>;
  if (!place) return <div className="empty"><h2>Place not found</h2><Link to="/places" className="btn btn-outline">Back to Places</Link></div>;

  return (
    <main className="section page-shell">
      <div className="container">
        <div className="detail-card">
          <img className="detail-image" src={place.image} alt={place.name} />
          <div className="detail-body">
            <span className="place-category">{place.category}</span>
            <h1>{place.name}</h1>
            {place.city && <p className="place-city"><Link to={`/cities/${place.city._id}`}>{place.city.name}</Link></p>}
            <p className="detail-description">{place.description}</p>
            <div className="detail-info-grid">
              <div><strong>Rating</strong><span>⭐ {place.rating}</span></div>
              <div><strong>Location</strong><span>{place.location || '—'}</span></div>
              <div><strong>Opening Hours</strong><span>{place.openingHours || '—'}</span></div>
              <div><strong>Ticket Price</strong><span>{place.ticketPrice || '—'}</span></div>
            </div>
            <div className="detail-actions">
              {isAuthenticated && <button className={`btn ${isFav ? 'btn-danger' : 'btn-primary'}`} onClick={toggleFavorite} disabled={favLoading}>{favLoading ? '...' : isFav ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}</button>}
              {!isAuthenticated && <Link className="btn btn-primary" to="/login">Login to save this place</Link>}
              <Link to="/places" className="btn btn-outline">← Back to Places</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
