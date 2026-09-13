import { Link } from 'react-router-dom';

export default function CityCard({ city }) {
  return (
    <article className="city-card">
      <img src={city.image} alt={city.name} loading="lazy" />
      <div className="city-card-content">
        <h3>{city.name}</h3>
        <p>{city.description || `Explore ${city.name} and discover its attractions.`}</p>
        <Link to={`/cities/${city._id}`} className="place-button">Explore City</Link>
      </div>
    </article>
  );
}
