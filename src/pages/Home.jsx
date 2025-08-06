import React from 'react';

function Home() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Exotic Kingdom!</h1>
      <p className="text-gray-600 text-lg">
        Explore as diferentes categorias de animais exóticos usando o menu de navegação acima.
      </p>
      <p className="text-gray-600 text-lg mt-2">
        Você também pode adicionar novos animais à nossa coleção.
      </p>
    </div>
  );
}

export default Home;
