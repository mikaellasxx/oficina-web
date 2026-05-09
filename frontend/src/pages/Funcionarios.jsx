import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Funcionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('http://localhost:5008/api/Funcionarios')
      .then((res) => res.json())
      .then((data) => setFuncionarios(data))
      .catch((err) => console.error(err));
  }, []);

  // editar funcionário
  const handleEditar = (id) => {
    navigate(`/funcionarios/editar/${id}`);
  };

  // excluir funcionário
  const handleExcluir = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      return;
    }

    fetch(`http://localhost:5008/api/Funcionarios/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao excluir funcionário');
        setFuncionarios(funcionarios.filter((f) => f.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao excluir funcionário');
      });
  };

  // filtro de busca
  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>👷 Funcionários</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/funcionarios/novo')}
        >
          + Novo funcionário
        </button>
      </div>

      {/* BUSCA */}
      <div className='card p-3 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Pesquisar funcionário...'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {funcionariosFiltrados.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhum funcionário encontrado</h5>
            <p>Cadastre um novo funcionário</p>
          </div>
        ) : (
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {funcionariosFiltrados.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cargo}</td>
                  <td>{funcionario.telefone}</td>
                  <td>{funcionario.email}</td>
                  <td>{funcionario.endereco}</td>

                  {/* AÇÕES */}
                  <td>
                    <button
                      className='btn btn-sm btn-warning me-1'
                      onClick={() => handleEditar(funcionario.id)}
                    >
                      Editar
                    </button>

                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => handleExcluir(funcionario.id)}
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
