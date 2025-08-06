import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. Importar o Toaster

// Páginas
import PaginaCategoria from './pages/PaginaCategoria';
import CriarAnimal from './pages/CriarAnimal';
import EditarAnimal from './pages/EditarAnimal'; // 2. Importar a nova página de edição
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      {/* 3. Adicionar o componente Toaster para que as notificações funcionem em todo o site */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen bg-gray-100 font-sans">
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Exotic Kingdom
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/aves" className="text-gray-600 hover:text-blue-500 transition-colors">Aves</Link>
              <Link to="/repteis" className="text-gray-600 hover:text-blue-500 transition-colors">Répteis</Link>
              <Link to="/mamiferos" className="text-gray-600 hover:text-blue-500 transition-colors">Mamíferos</Link>
              <Link to="/anfibios" className="text-gray-600 hover:text-blue-500 transition-colors">Anfíbios</Link>
              <Link to="/criar" className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                + Adicionar Animal
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoria" element={<PaginaCategoria />} />
            <Route path="/criar" element={<CriarAnimal />} />
            {/* 4. Adicionar a rota para a página de edição */}
            <Route path="/editar/:id" element={<EditarAnimal />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
