import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Fornecedores() {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('http://localhost:5008/api/Fornecedores')
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((err) => console.error(err));
  }, []);

  // filtro de busca
  const fornecedoresFiltrados = fornecedores.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>🚚 Fornecedores</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/fornecedores/novo')}
        >
          + Novo fornecedor
        </button>
      </div>

      {/* BUSCA */}
      <div className='card p-3 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Pesquisar fornecedor...'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {fornecedoresFiltrados.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhum fornecedor encontrado</h5>
            <p>Cadastre um novo fornecedor</p>
          </div>
        ) : (
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {fornecedoresFiltrados.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.documento}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.email}</td>

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
