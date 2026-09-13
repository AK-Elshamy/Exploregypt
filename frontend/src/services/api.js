import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getPlaces = async (params = {}) => {
  const response = await api.get('/places', {
    params: {
      search: params.search || undefined,
      city: params.city || undefined,
      category: params.category || undefined,
      sort: params.sort || undefined,
      page: params.page || undefined,
      limit: params.limit || undefined,
    },
  });

  return response.data;
};

export default api;