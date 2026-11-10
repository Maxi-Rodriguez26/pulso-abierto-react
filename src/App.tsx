import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CryptoDetail } from './pages/CryptoDetail';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta dinámica para el detalle */}
        <Route path="/criptomonedas/:id" element={<CryptoDetail />} />
        
        {/* Ruta para cualquier otra dirección (NotFound) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;