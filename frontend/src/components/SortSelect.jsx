function SortSelect({ sortBy, onSortChange }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
  );
}

export default SortSelect;