import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import CityFilter from './CityFilter'
import CategoryFilter from './CategoryFilter'
import SortSelect from './SortSelect'

function SearchFilters({ onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    onFiltersChange({
      search: searchTerm,
      city: selectedCity,
      category: selectedCategory,
      sort: sortBy,
    })
  }, [
    searchTerm,
    selectedCity,
    selectedCategory,
    sortBy,
    onFiltersChange,
  ])

  return (
    <section>
      <h2>Explore Places</h2>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <CityFilter
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <SortSelect
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </section>
  )
}

export default SearchFilters