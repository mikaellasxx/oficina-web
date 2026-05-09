import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pecas() {
  const navigate = useNavigate();
  const [pecas, setPecas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('http://localhost:5008/api/Pecas')
      .then((res) => res.json())
      .then((data) => setPecas(data))
      .catch((err) => console.error(err));
  }, []);

  // filtro de busca
  const pecasFiltradas = pecas.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  // EDITAR
  const handleEditar = (id) => {
    navigate(`/pecas/editar/${id}`);
  };

  // EXCLUIR
  const handleExcluir = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir essa peça?')) {
      return;
    }

    fetch(`http://localhost:5008/api/Pecas/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setPecas(pecas.filter((p) => p.id !== id));
          alert('Peça excluída com sucesso!');
        } else {
          alert('Erro ao excluir peça');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao conectar com a API');
      });
  };

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>🛠️ Peças</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/pecas/nova')}
        >
          + Novo peça
        </button>
      </div>

      {/* BUSCA */}
      <div className='card p-3 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Pesquisar peça...'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {pecasFiltradas.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhuma peça encontrada</h5>
            <p>Cadastre uma nova peça</p>
          </div>
        ) : (
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque disponível</th>
                <th>Fornecedor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pecasFiltradas.map((peca) => (
                <tr key={peca.id}>
                  <td>{peca.nome}</td>
                  <td>{peca.preco}</td>
                  <td>{peca.quantidade}</td>
                  <td>{peca.fornecedor?.nome || 'N/A'}</td>

                  {/* AÇÕES */}
                  <td>
                    <button
                      className='btn btn-sm btn-warning me-1'
                      onClick={() => handleEditar(peca.id)}
                    >
                      Editar
                    </button>

                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => handleExcluir(peca.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
