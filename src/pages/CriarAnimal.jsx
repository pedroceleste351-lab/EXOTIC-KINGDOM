import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Importar toast

function CriarAnimal() {
  const [raca, setRaca] = useState('');
  const [categoria, setCategoria] = useState('ave');
  const [fotoUrl, setFotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!raca || !fotoUrl) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsSubmitting(true);
    const novoAnimal = { raca, categoria, fotoUrl, criadorId: 1 };

    fetch('http://localhost:3000/animais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAnimal),
    })
    .then(response => {
      if (response.ok) {
        toast.success('Animal criado com sucesso!'); // Usar toast
        navigate(`/${categoria}`);
      } else {
        throw new Error('Falha ao criar o animal.');
      }
    })
    .catch(err => {
      toast.error(err.message); // Usar toast
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Animal</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="raca" className="block text-sm font-medium text-gray-700">Raça</label>
          <input type="text" id="raca" value={raca} onChange={(e) => setRaca(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: Jiboia"/>
        </div>
        <div>
          <label htmlFor="fotoUrl" className="block text-sm font-medium text-gray-700">URL da Foto</label>
          <input type="text" id="fotoUrl" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://exemplo.com/imagem.jpg"/>
        </div>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option value="ave">Ave</option>
            <option value="reptil">Réptil</option>
            <option value="mamifero">Mamífero</option>
            <option value="anfibio">Anfíbio</option>
          </select>
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
            {isSubmitting ? 'Salvando...' : 'Salvar Animal'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CriarAnimal;
