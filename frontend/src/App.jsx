import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cities from './pages/Cities'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App