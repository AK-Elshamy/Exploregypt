import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../services/favoriteService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
      setError('');
    } catch (err) {
      setError('Failed to load favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (placeId) => {
    try {
      await removeFavorite(placeId);
      setFavorites(favorites.filter(fav => fav.placeId !== placeId));
    } catch (err) {
      alert('Failed to remove from favorites');
    }
  };

  if (loading) {
    return <div className="loading">Loading your favorites...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadFavorites}>Retry</button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="empty">
        <h2>No Favorites Yet ❤️</h2>
        <p>Start exploring and save places you love!</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">My Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((fav) => (
          <div key={fav._id} className="favorite-card">
            <img
              src={fav.placeId?.images?.[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={fav.placeId?.name || 'Place'}
            />
            <div className="card-body">
              <h3>{fav.placeId?.name || 'Unknown Place'}</h3>
              <p className="city">{fav.placeId?.city || 'Unknown City'}</p>
              <p className="desc">{fav.placeId?.description || 'No description available'}</p>
              <button
                className="btn-remove"
                onClick={() => handleRemove(fav.placeId._id)}
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;