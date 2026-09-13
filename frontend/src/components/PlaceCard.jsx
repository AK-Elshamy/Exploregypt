import { Link } from 'react-router-dom';
import HeartButton from './HeartButton';

export default function PlaceCard({ place }) {
  return (
    <article className="place-card">
      <div className="card-img">
        <img
          src={place.image}
          alt={place.name}
          className="place-card-image"
          loading="lazy"
        />
        <HeartButton placeId={place._id} />
      </div>

      <div className="place-card-content">
        <span className="place-category">{place.category}</span>

        <h3>{place.name}</h3>

        {place.city?.name && (
          <p className="place-city">{place.city.name}</p>
        )}

        <p className="place-description">
          {place.description}
        </p>

        <Link
          to={`/places/${place._id}`}
          className="place-button"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}