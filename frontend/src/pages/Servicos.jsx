import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Servicos() {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('http://localhost:5008/api/Servicos')
      .then((res) => res.json())
      .then((data) => setServicos(data))
      .catch((err) => console.error(err));
  }, []);

  // filtro de busca
  const servicosFiltrados = servicos.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>🤝 Serviços</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/servicos/novo')}
        >
          + Novo serviço
        </button>
      </div>

      {/* BUSCA */}
      <div className='card p-3 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Pesquisar serviço...'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {servicosFiltrados.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhum serviço encontrado</h5>
            <p>Cadastre um novo serviço</p>
          </div>
        ) : (
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {servicosFiltrados.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.nome}</td>
                  <td>{servico.preco}</td>

                  {/* AÇÕES */}
                  <td>
                    <button className='btn btn-sm btn-warning me-1'>
                      Editar
                    </button>

                    <button className='btn btn-sm btn-danger'>Excluir</button>
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
