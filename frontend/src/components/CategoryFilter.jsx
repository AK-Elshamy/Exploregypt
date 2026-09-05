function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Historical">Historical</option>
      <option value="Museum">Museum</option>
      <option value="Beach">Beach</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Hotel">Hotel</option>
      <option value="Activity">Activity</option>
    </select>
  );
}

export default CategoryFilter;