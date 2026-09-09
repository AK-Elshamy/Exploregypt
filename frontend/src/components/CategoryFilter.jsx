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
      <option value="Nature">Nature</option>
      <option value="Religious">Religious</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Shopping">Shopping</option>
      <option value="Other">Other</option>
    </select>
  )
}

export default CategoryFilter