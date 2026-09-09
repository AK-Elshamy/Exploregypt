import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlace, checkFavorite, addFavorite, removeFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function PlaceDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [place, setPlace] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    getPlace(id)
      .then((res) => setPlace(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));

    if (isAuthenticated) {
      checkFavorite(id)
        .then((res) => setIsFav(res.data.isFavorite))
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) return;
    setFavLoading(true);
    try {
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

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!place) {
    return <div className="empty">Place not found</div>;
  }

  return (
    <>
      <div className="detail-hero">
        <img src={place.image} alt={place.name} />
      </div>
      <section className="section detail-content">
        <div className="container">
          <div className="detail-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1>{place.name}</h1>
                <div className="detail-meta">
                  <span className="badge">{place.category}</span>
                  {place.city && (
                    <Link to={`/cities/${place.city._id}`} className="badge badge-secondary">
                      {place.city.name}
                    </Link>
                  )}
                  <span>⭐ {place.rating}</span>
                </div>
              </div>
              {isAuthenticated && (
                <button
                  className={`btn ${isFav ? 'btn-danger' : 'btn-primary'}`}
                  onClick={toggleFavorite}
                  disabled={favLoading}
                >
                  {favLoading ? '...' : isFav ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
                </button>
              )}
            </div>

            <p style={{ lineHeight: 1.8, marginTop: '1rem' }}>{place.description}</p>

            <div className="detail-info-grid">
              <div className="detail-info-item">
                <strong>Location</strong>
                {place.location || '—'}
              </div>
              <div className="detail-info-item">
                <strong>Opening Hours</strong>
                {place.openingHours}
              </div>
              <div className="detail-info-item">
                <strong>Ticket Price</strong>
                {place.ticketPrice}
              </div>
              <div className="detail-info-item">
                <strong>Category</strong>
                {place.category}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/places" className="btn btn-outline">
                ← Back to Places
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
