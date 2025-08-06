import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditarAnimal() {
  // O useParams pega o 'id' da URL (ex: /editar/3)
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para o formulário e controlo
  const [raca, setRaca] = useState('');
  const [categoria, setCategoria] = useState('ave');
  const [fotoUrl, setFotoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Buscar os dados do animal a ser editado quando a página carrega
  useEffect(() => {
    fetch(`http://localhost:3000/animais/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Animal não encontrado.');
        return response.json();
      })
      .then(data => {
        // Preenche o formulário com os dados existentes
        setRaca(data.raca);
        setCategoria(data.categoria);
        setFotoUrl(data.fotoUrl);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]); // Roda apenas quando o ID na URL muda

  // 2. Função para submeter as alterações
  const handleSubmit = (event) => {
    event.preventDefault();
    const animalAtualizado = { raca, categoria, fotoUrl };

    fetch(`http://localhost:3000/animais/${id}`, {
      method: 'PUT', // PUT substitui o objeto inteiro
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalAtualizado),
    })
    .then(response => {
      if (response.ok) {
        toast.success('Animal atualizado com sucesso!');
        navigate(`/${categoria}`); // Volta para a página da categoria
      } else {
        throw new Error('Falha ao atualizar o animal.');
      }
    })
    .catch(err => toast.error(err.message));
  };

  if (loading) return <p>A carregar dados do animal...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Animal</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Formulário é igual ao de criação, mas já vem preenchido */}
        <div>
          <label htmlFor="raca" className="block text-sm font-medium text-gray-700">Raça</label>
          <input type="text" id="raca" value={raca} onChange={(e) => setRaca(e.target.value)} className="mt-1 block w-full ..."/>
        </div>
        <div>
          <label htmlFor="fotoUrl" className="block text-sm font-medium text-gray-700">URL da Foto</label>
          <input type="text" id="fotoUrl" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} className="mt-1 block w-full ..."/>
        </div>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full ...">
            <option value="ave">Ave</option>
            <option value="reptil">Réptil</option>
            <option value="mamifero">Mamífero</option>
            <option value="anfibio">Anfíbio</option>
          </select>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 ...">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarAnimal;
