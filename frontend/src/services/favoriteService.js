import api from './api';

export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addFavorite = async (placeId) => {
  const response = await api.post('/favorites', { placeId });
  return response.data;
};

export const removeFavorite = async (placeId) => {
  const response = await api.delete(`/favorites/${placeId}`);
  return response.data;
};