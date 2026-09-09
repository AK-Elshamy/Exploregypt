import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cities from './pages/Cities'
import Places from './pages/Places'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Welcome to Exploregypt 🇪🇬</h1>
              <p>Discover the beauty of Egypt</p>
            </main>
          }
        />

        <Route path="/cities" element={<Cities />} />

        <Route path="/places" element={<Places />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App