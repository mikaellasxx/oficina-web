import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('http://localhost:5008/api/Clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error(err));
  }, []);

  // filtro de busca
  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  // EDITAR
  const handleEditar = (id) => {
    navigate(`/clientes/editar/${id}`);
  };

  // EXCLUIR
  const handleExcluir = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esse cliente?')) {
      return;
    }

    fetch(`http://localhost:5008/api/Clientes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setClientes(clientes.filter((c) => c.id !== id));
          alert('Cliente excluído com sucesso!');
        } else {
          alert('Erro ao excluir cliente');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao conectar com a API');
      });
  };

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>👥 Clientes</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/clientes/novo')}
        >
          + Novo cliente
        </button>
      </div>

      {/* BUSCA */}
      <div className='card p-3 mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Pesquisar cliente...'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {clientesFiltrados.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhum cliente encontrado</h5>
            <p>Cadastre um novo cliente</p>
          </div>
        ) : (
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Veículos</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>

                  {/* VEÍCULOS */}
                  <td>
                    {cliente.veiculos?.length > 0 ? (
                      cliente.veiculos.map((v) => (
                        <div key={v.id}>
                          {v.modelo} - {v.placa}
                        </div>
                      ))
                    ) : (
                      <span className='text-muted'>Sem veículos</span>
                    )}
                  </td>

                  {/* AÇÕES */}
                  <td>
                    <button
                      onClick={() => handleEditar(cliente.id)}
                      className='btn btn-sm btn-warning me-1'
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleExcluir(cliente.id)}
                      className='btn btn-sm btn-danger'
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
