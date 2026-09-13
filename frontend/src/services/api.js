import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPlaces = async (params = {}) => {
  const response = await api.get('/places', { params });
  return response.data;
};

export const getPlace = async (id) => {
  const response = await api.get(`/places/${id}`);
  return response.data;
};

export const getCities = async () => {
  const response = await api.get('/cities');
  return response.data;
};

export const getCity = async (id) => {
  const response = await api.get(`/cities/${id}`);
  return response.data;
};

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

export default api;
