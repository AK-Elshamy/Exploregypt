function CityFilter({ selectedCity, onCityChange }) {
  return (
    <select
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
    >
      <option value="">All Cities</option>
      <option value="Cairo">Cairo</option>
      <option value="Luxor">Luxor</option>
      <option value="Aswan">Aswan</option>
      <option value="Hurghada">Hurghada</option>
      <option value="Sharm El-Sheikh">Sharm El-Sheikh</option>
      <option value="Dahab">Dahab</option>
    </select>
  );
}

export default CityFilter;