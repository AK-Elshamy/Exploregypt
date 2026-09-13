import PlaceCard from './PlaceCard';

export default function PlaceResults({ places }) {
  if (!places.length) return <div className="empty-state"><h3>No places found</h3><p>Try changing your search or filters.</p></div>;
  return (
    <section className="results-section">
      <div className="section-title"><h2>Results</h2><p>{places.length} place(s) found</p></div>
      <div className="grid grid-3">{places.map((place) => <PlaceCard key={place._id} place={place} />)}</div>
    </section>
  );
}
