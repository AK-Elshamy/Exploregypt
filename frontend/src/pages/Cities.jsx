import CityCard from '../components/CityCard'

function Cities() {
  const cities = [
    {
      name: 'Cairo',
      description: 'Discover the capital of Egypt',
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
    },
    {
      name: 'Luxor',
      description: 'Explore ancient Egyptian history',
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020',
    },
    {
      name: 'Aswan',
      description: 'Enjoy the beauty of the Nile',
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020',
    },
  ]

  return (
    <main>
      <h1>Explore Egyptian Cities</h1>

      <div className="cities-container">
        {cities.map((city) => (
          <CityCard
            key={city.name}
            name={city.name}
            description={city.description}
            image={city.image}
          />
        ))}
      </div>
    </main>
  )
}

export default Cities