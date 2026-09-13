function CityCard({ name, description, image }) {
  return (
    <div className="city-card">
      <img src={image} alt={name} />

      <div className="city-card-content">
        <h3>{name}</h3>
        <p>{description}</p>

        <a href={`/cities/${name.toLowerCase()}`}>
          Explore City
        </a>
      </div>
    </div>
  )
}

export default CityCard