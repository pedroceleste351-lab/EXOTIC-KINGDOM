// src/pages/CriarAnimal.jsx

import { useState } from 'react';

function CriarAnimal() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const novoAnimal = { nome, especie };

    try {
      await fetch('URL_DA_SUA_API/animais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAnimal),
      });
      alert('Animal criado com sucesso!');
      // Limpar formulário
      setNome('');
      setEspecie('');
    } catch (error) {
      console.error("Erro ao criar animal:", error);
      alert('Falha ao criar animal.');
    }
  };

  return (
    <div>
      <h1>Adicionar Novo Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Espécie:</label>
          <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CriarAnimal;