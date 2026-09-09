import { useState } from 'react'
import PlaceCard from '../components/PlaceCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

function Places() {
  const [status, setStatus] = useState('success')

  const places = [
    {
      name: 'The Pyramids',
      description: 'One of the most famous ancient landmarks in Egypt.',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',
      category: 'Historical',
      city: 'Cairo',
    },
    {
      name: 'Karnak Temple',
      description: 'A magnificent ancient temple complex in Luxor.',
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020',
      category: 'Temple',
      city: 'Luxor',
    },
    {
      name: 'Nubian Village',
      description: 'Experience the colorful culture and beauty of Aswan.',
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020',
      category: 'Culture',
      city: 'Aswan',
    },
  ]

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'error') {
    return <ErrorMessage message="Failed to load places." />
  }

  if (status === 'empty') {
    return <EmptyState message="No places found." />
  }

  return (
    <main>
      <h1>Explore Egyptian Places</h1>

      <div className="places-container">
        {places.map((place) => (
          <PlaceCard
            key={place.name}
            name={place.name}
            description={place.description}
            image={place.image}
            category={place.category}
            city={place.city}
          />
        ))}
      </div>
    </main>
  )
}

export default Places