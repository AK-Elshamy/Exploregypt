function PlaceResults({ places }) {
  if (places.length === 0) {
    return (
      <div>
        <h3>No places found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    )
  }

  return (
    <section>
      <h2>Results</h2>

      <p>{places.length} place(s) found</p>

      {places.map((place) => (
        <article key={place._id}>
          <h3>{place.name}</h3>

          <p>
            City: {place.city?.name || 'Unknown city'}
          </p>

          <p>
            Category: {place.category}
          </p>

          {place.description && (
            <p>{place.description}</p>
          )}

          {place.rating !== undefined && (
            <p>Rating: {place.rating} / 5</p>
          )}
        </article>
      ))}
    </section>
  )
}

export default PlaceResults