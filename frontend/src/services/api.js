const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function apiRequest(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function getPlaces(params = {}) {
  const query = new URLSearchParams()

  if (params.search) query.set('search', params.search)
  if (params.city) query.set('city', params.city)
  if (params.category) query.set('category', params.category)
  if (params.sort) query.set('sort', params.sort)
  if (params.page) query.set('page', params.page)
  if (params.limit) query.set('limit', params.limit)

  const queryString = query.toString()

  return apiRequest(`/places${queryString ? `?${queryString}` : ''}`)
}