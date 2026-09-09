import { Link } from 'react-router-dom';

export default function PlaceCard({ place }) {
  return (
    <Link to={`/places/${place._id}`} className="card">
      <div className="card-img">
        <img src={place.image} alt={place.name} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <div className="card-meta">
          <span className="badge">{place.category}</span>
          {place.city?.name && <span className="badge badge-secondary">{place.city.name}</span>}
          <span>⭐ {place.rating}</span>
        </div>
      </div>
    </Link>
  );
}
