import { useState } from 'react'
import SearchFilters from './components/SearchFilters'
import PlaceResults from './components/PlaceResults'

const samplePlaces = [
  {
    id: 1,
    name: 'Pyramids of Giza',
    city: 'Cairo',
    category: 'Historical',
  },
  {
    id: 2,
    name: 'Egyptian Museum',
    city: 'Cairo',
    category: 'Museum',
  },
  {
    id: 3,
    name: 'Karnak Temple',
    city: 'Luxor',
    category: 'Historical',
  },
  {
    id: 4,
    name: 'Valley of the Kings',
    city: 'Luxor',
    category: 'Historical',
  },
  {
    id: 5,
    name: 'Philae Temple',
    city: 'Aswan',
    category: 'Historical',
  },
  {
    id: 6,
    name: 'Blue Hole',
    city: 'Dahab',
    category: 'Nature',
  },
  {
    id: 7,
    name: 'Naama Bay',
    city: 'Sharm El-Sheikh',
    category: 'Beach',
  },
  {
    id: 8,
    name: 'Giftun Island',
    city: 'Hurghada',
    category: 'Beach',
  },
]

function App() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    category: '',
    sort: '',
  })

  let filteredPlaces = samplePlaces.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(filters.search.toLowerCase())

    const matchesCity =
      !filters.city || place.city === filters.city

    const matchesCategory =
      !filters.category || place.category === filters.category

    return matchesSearch && matchesCity && matchesCategory
  })

  if (filters.sort === 'name-asc') {
    filteredPlaces = [...filteredPlaces].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }

  if (filters.sort === 'name-desc') {
    filteredPlaces = [...filteredPlaces].sort((a, b) =>
      b.name.localeCompare(a.name)
    )
  }

  return (
    <main>
      <h1>Explore Egypt</h1>
      <p>Discover amazing places across Egypt</p>

      <SearchFilters onFiltersChange={setFilters} />

      <PlaceResults places={filteredPlaces} />
    </main>
  )
}

export default App