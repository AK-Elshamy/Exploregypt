function PlaceCard({ name, description, image, category, city }) {
  return (
    <article className="place-card">
      <img
        src={image}
        alt={name}
        className="place-card-image"
      />

      <div className="place-card-content">
        <span className="place-category">{category}</span>

        <h3>{name}</h3>

        <p className="place-city">{city}</p>

        <p className="place-description">
          {description}
        </p>

        <a
          href={`/places/${name.toLowerCase().replaceAll(' ', '-')}`}
          className="place-button"
        >
          View Details
        </a>
      </div>
    </article>
  )
}

export default PlaceCard