function PlaceDetails({ name, description, image, category, city, location }) {
  return (
    <article className="place-details">
      <img
        src={image}
        alt={name}
        className="place-details-image"
      />

      <div className="place-details-content">
        <span className="place-category">{category}</span>

        <h1>{name}</h1>

        <p className="place-city">{city}</p>

        <p className="place-description">
          {description}
        </p>

        {location && (
          <p className="place-location">
            📍 {location}
          </p>
        )}
      </div>
    </article>
  )
}

export default PlaceDetails