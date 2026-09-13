import { useEffect, useState } from 'react';
import { getCities } from '../services/api';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortSelect from './SortSelect';

function SearchFilters({ onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities().then((data) => setCities(data.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    onFiltersChange({ search: searchTerm, city: selectedCity, category: selectedCategory, sort: sortBy });
  }, [searchTerm, selectedCity, selectedCategory, sortBy, onFiltersChange]);

  return (
    <section className="filter-panel">
      <div className="section-title"><h2>Find a place</h2><p>Search and filter attractions across Egypt.</p></div>
      <div className="filter-grid">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}><option value="">All Cities</option>{cities.map((city) => <option key={city._id} value={city._id}>{city.name}</option>)}</select>
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
      </div>
    </section>
  );
}

export default SearchFilters;
