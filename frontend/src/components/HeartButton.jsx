import React, { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';

const HeartButton = ({ placeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if place is in favorites
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await getFavorites();
        const exists = favorites.some(fav => 
          (fav.placeId?._id || fav.placeId) === placeId
        );
        setIsFavorite(exists);
      } catch (error) {
        // Silent fail - مش مسجل دخول
      }
    };

    if (placeId) {
      checkFavorite();
    }
  }, [placeId]);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(placeId);
        setIsFavorite(false);
      } else {
        await addFavorite(placeId);
        setIsFavorite(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="heart-btn"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default HeartButton;