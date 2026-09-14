import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavorite, getFavorites, removeFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function HeartButton({ placeId }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !placeId) return;

      try {
        const favorites = await getFavorites();
        setIsFavorite(favorites.some((fav) => (fav.placeId?._id || fav.placeId) === placeId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, placeId]);

  const handleToggle = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      if (isFavorite) {
        await removeFavorite(placeId);
        setIsFavorite(false);
      } else {
        await addFavorite(placeId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <button className="heart-btn" onClick={handleToggle} disabled={loading} title={isAuthenticated ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to add favorites'}>{isFavorite ? '❤️' : '🤍'}</button>;
}
