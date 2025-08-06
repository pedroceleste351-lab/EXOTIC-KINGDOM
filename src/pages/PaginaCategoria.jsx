import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importar Link para o botão de editar
import toast from 'react-hot-toast'; // Importar toast para notificações

function PaginaCategoria() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoria } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/animais?categoria=${categoria}`)
      .then(response => {
        if (!response.ok) throw new Error('Falha ao buscar os dados.');
        return response.json();
      })
      .then(data => setAnimais(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoria]);

  // Função para apagar um animal
  const handleApagar = (idAnimal) => {
    if (window.confirm('Tem a certeza de que quer apagar este animal?')) {
      fetch(`http://localhost:3000/animais/${idAnimal}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setAnimais(animaisAtuais => animaisAtuais.filter(animal => animal.id !== idAnimal));
          toast.success('Animal apagado com sucesso!');
        } else {
          throw new Error('Falha ao apagar o animal.');
        }
      })
      .catch(err => toast.error(err.message));
    }
  };

  if (loading) return <div className="text-center text-gray-500">Carregando animais...</div>;
  if (error) return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">Erro: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700 mb-6 capitalize">{categoria}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animais.length > 0 ? (
          animais.map(animal => (
            <div key={animal.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img 
                src={animal.fotoUrl} 
                alt={animal.raca} 
                className="w-full h-48 object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/e2e8f0/a0aec0?text=Imagem+Indisponível'; }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 flex-grow">{animal.raca}</h3>
                {/* Botões de Ação */}
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/editar/${animal.id}`} className="text-sm text-blue-500 hover:text-blue-700 font-semibold">
                    Editar
                  </Link>
                  <button onClick={() => handleApagar(animal.id)} className="text-sm text-red-500 hover:text-red-700 font-semibold">
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Nenhum animal encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
}

export default PaginaCategoria;
