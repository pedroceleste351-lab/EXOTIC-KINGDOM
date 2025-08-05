// src/pages/Home.jsx

import { useState, useEffect } from 'react';

function Home() {
  const [animais, setAnimais] = useState([]); // Onde a lista de animais será guardada

  // useEffect é usado para executar código quando o componente é montado
  useEffect(() => {
    // Função para buscar dados da API (substitua pela sua URL)
    async function fetchAnimais() {
      try {
        const response = await fetch('URL_DA_SUA_API/animais');
        const data = await response.json();
        setAnimais(data); // Guarda os dados no estado
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    }

    fetchAnimais();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  return (
    <div>
      <h1>Lista de Animais Exóticos</h1>
      <ul>
        {animais.map(animal => (
          <li key={animal.id}>{animal.nome} - {animal.especie}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;