import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const HERO_IMAGE =
  'https://cdn.kimkim.com/files/a/images/79615877e963146adeebd990e88114c197bc9626/big-384cf01043e514713733d450ad95a918.jpg?_gl=1*17zeshc*_gcl_au*MjEzNjg2NzY0NC4xNzg5MzM4Njg0';

const NILE_IMAGE =
  'https://assets.cairo360.com/app/uploads/2023/03/08/The_River_Nile_Cairo_Egypt-1024x768.jpeg';

const ANCIENT_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFa7ekley8ObGWqPB2VSUqQrHe4YwJPq9Too8c1xk-X4UHhtrIJmkFdc8&s=10';

const NEW_CAPITAL_IMAGE =
  'https://www.egyptaqar.com/wp-content/uploads/2021/10/%D9%88%D8%A7%D8%AC%D9%87%D8%A9-%D9%85%D9%88%D9%84-%D9%8A%D9%88-%D8%B3%D9%8A-%D8%A7%D9%84%D8%B9%D8%A7%D8%B5%D9%85%D8%A9-%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D9%8A%D8%A9.jpg';

const RED_SEA_IMAGE =
  'https://betamedia.experienceegypt.eg/media/experienceegypt/img/Original/2022/8/7/2022_8_7_17_54_18_456.jpg';

function Home() {
  const scrollToJourney = () => {
    document.getElementById('home-journey')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <main className="home-page">
      <section
        className="home-hero"
        style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
      >
        <div className="home-hero-overlay" />
        <div className="container home-hero-content">
          <p className="home-eyebrow">WELCOME TO EGYPT 🇪🇬</p>

          <h1>
            Where every journey
            <span> tells a story.</span>
          </h1>

          <p className="home-hero-text">
            Discover ancient wonders, peaceful Nile nights, vibrant cities,
            and unforgettable adventures across Egypt.
          </p>

          <div className="home-hero-actions">
            <button className="home-btn home-btn-primary" onClick={scrollToJourney}>
              Start Exploring
              <span>→</span>
            </button>

            <a className="home-btn home-btn-light" href="/cities">
              Explore Cities
            </a>
          </div>

          <div className="home-hero-note">
            <span>✦</span>
            From ancient wonders to a modern future
          </div>
        </div>
      </section>

      <section className="home-intro" id="home-journey">
        <div className="container">
          <div className="home-section-heading">
            <p className="home-eyebrow home-eyebrow-dark">WHY EGYPT?</p>
            <h2>A country with more than one story.</h2>
            <p>
              Walk through thousands of years of history, follow the Nile,
              relax by the Red Sea, and experience a country where the past
              and future meet.
            </p>
          </div>

          <div className="home-feature-grid">
            <article className="home-feature-card">
              <div className="home-feature-icon">🏺</div>
              <h3>Timeless History</h3>
              <p>
                Pyramids, temples, museums, and ancient cities waiting to be
                explored.
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-icon">🌊</div>
              <h3>Natural Beauty</h3>
              <p>
                The Nile, turquoise seas, coral reefs, deserts, and peaceful
                coastal escapes.
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-icon">✨</div>
              <h3>Modern Egypt</h3>
              <p>
                A vibrant present and a rapidly growing future beyond the
                ancient landmarks.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-image-story home-nile-story">
        <img src={NILE_IMAGE} alt="The Nile River in Cairo" />
        <div className="home-story-overlay" />
        <div className="container home-story-content">
          <p className="home-eyebrow">THE HEART OF EGYPT</p>
          <h2>Follow the Nile.</h2>
          <p>
            A river that has connected people, cities, and civilizations for
            thousands of years.
          </p>
          <a href="/cities" className="home-story-link">
            Discover Egyptian cities <span>→</span>
          </a>
        </div>
      </section>

      <section className="home-era-section">
        <div className="container">
          <div className="home-section-heading">
            <p className="home-eyebrow home-eyebrow-dark">EGYPT THROUGH TIME</p>
            <h2>From ancient wonders to a modern future.</h2>
            <p>
              Egypt is not only about what happened thousands of years ago.
              There is a new story being written today.
            </p>
          </div>

          <div className="home-era-grid">
            <article className="home-era-card">
              <img src={ANCIENT_IMAGE} alt="Ancient Egyptian landmark" />
              <div className="home-era-content">
                <span>THEN</span>
                <h3>Thousands of years of history</h3>
                <p>
                  Explore the civilization, architecture, and stories that
                  made ancient Egypt legendary.
                </p>
                <a href="/places">Explore ancient places →</a>
              </div>
            </article>

            <article className="home-era-card">
              <img
                src={NEW_CAPITAL_IMAGE}
                alt="New Administrative Capital in Egypt"
              />
              <div className="home-era-content">
                <span>NOW & NEXT</span>
                <h3>A new chapter is being built</h3>
                <p>
                  See another side of Egypt through modern architecture,
                  growing cities, and new experiences.
                </p>
                <a href="/cities">Explore cities →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-red-sea">
        <img src={RED_SEA_IMAGE} alt="Red Sea beach in Egypt" />
        <div className="home-red-sea-overlay" />
        <div className="container home-red-sea-content">
          <p className="home-eyebrow">ESCAPE TO THE RED SEA</p>
          <h2>Blue water. Warm sun. Zero rush.</h2>
          <p>
            From Hurghada to Sharm El-Sheikh and Dahab, find your own way to
            slow down and enjoy the sea.
          </p>
          <a href="/places" className="home-btn home-btn-light">
            Discover Places
          </a>
        </div>
      </section>

      <section className="home-final-cta">
        <div className="container">
          <p className="home-eyebrow home-eyebrow-dark">YOUR JOURNEY STARTS HERE</p>
          <h2>Ready to discover Egypt?</h2>
          <p>
            Choose a city, find a place, and start building your own Egyptian
            adventure.
          </p>

          <div className="home-final-actions">
            <a href="/cities" className="home-btn home-btn-primary">
              Explore Cities <span>→</span>
            </a>
            <a href="/places" className="home-btn home-btn-outline">
              Discover Places
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/:id" element={<CityDetail />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
