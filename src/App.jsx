// src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importe os componentes de página que vamos criar
import Home from './pages/Home';
import CriarAnimal from './pages/CriarAnimal';

function App() {
  return (
    <BrowserRouter>
      {/* Menu de Navegação - simples */}
      <nav>
        <Link to="/">Ver Animais</Link> | <Link to="/criar">Adicionar Animal</Link>
      </nav>

      <hr />

      {/* Área onde as páginas serão renderizadas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar" element={<CriarAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;