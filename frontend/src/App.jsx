import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import './index.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Welcome to Exploregypt</h1>} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;