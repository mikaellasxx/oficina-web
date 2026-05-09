import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Os() {
  const [ordens, setOrdens] = useState([]);
  const [busca, setBusca] = useState('');
  const [dataFiltro, setDataFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5008/api/OrdensServico')
      .then((res) => res.json())
      .then((data) => setOrdens(data));
  }, []);

  // filtro de busca
  const ordensFiltradas = ordens.filter((os) => {
    // Filtro de texto
    const termoBusca = busca.toLowerCase().trim();
    const matchBusca =
      !busca.trim() ||
      os.cliente?.nome?.toLowerCase().includes(termoBusca) ||
      os.funcionario?.nome?.toLowerCase().includes(termoBusca) ||
      os.veiculo?.modelo?.toLowerCase().includes(termoBusca) ||
      os.veiculo?.placa?.toLowerCase().includes(termoBusca) ||
      os.id.toString().includes(termoBusca) ||
      os.status?.toLowerCase().includes(termoBusca) ||
      os.descricao?.toLowerCase().includes(termoBusca);

    // Filtro de status
    const matchStatus = !statusFiltro || os.status === statusFiltro;

    // Filtro de data (data de criação da OS)
    const matchData =
      !dataFiltro ||
      new Date(os.dataInicio).toDateString() ===
        new Date(dataFiltro).toDateString();

    return matchBusca && matchStatus && matchData;
  });

  // função para excluir OS
  function excluirOS(id) {
    if (!confirm('Tem certeza que deseja excluir esta ordem de serviço?'))
      return;

    fetch(`http://localhost:5008/api/OrdensServico/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao excluir');
        // remove da lista
        setOrdens(ordens.filter((os) => os.id !== id));
        alert('OS excluída com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao excluir OS');
      });
  }

  // função para alterar status da OS
  async function alterarStatus(id, novoStatus) {
    try {
      // Primeiro busca a OS completa
      const resBusca = await fetch(
        `http://localhost:5008/api/OrdensServico/${id}`,
      );
      if (!resBusca.ok) throw new Error('Erro ao buscar OS');

      const osCompleta = await resBusca.json();

      // Atualiza apenas o status
      const osAtualizada = { ...osCompleta, status: novoStatus };

      // Envia a atualização
      const resUpdate = await fetch(
        `http://localhost:5008/api/OrdensServico/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(osAtualizada),
        },
      );

      if (!resUpdate.ok) throw new Error('Erro ao alterar status');

      // atualiza o status na lista local
      setOrdens(
        ordens.map((os) => (os.id === id ? { ...os, status: novoStatus } : os)),
      );
    } catch (err) {
      console.error(err);
      alert('Erro ao alterar status da OS');
    }
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4 '>📋 Ordens de Serviço</h1>

      {/* TOPO */}
      <div className='d-flex justify-content-between mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/os/novo')}
        >
          Nova ordem de serviço
        </button>
      </div>

      {/* FILTROS */}
      <div className='card p-3 mb-3'>
        <div className='row'>
          <div className='col-md-4'>
            <label>Data da OS</label>
            <input
              type='date'
              className='form-control'
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
            />
          </div>

          <div className='col-md-4'>
            <label>Status</label>
            <select
              className='form-control'
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value=''>Todos</option>
              <option value='Aberta'>Aberta</option>
              <option value='Em andamento'>Em andamento</option>
              <option value='Finalizada'>Finalizada</option>
            </select>
          </div>

          <div className='col-md-4'>
            <label>Pesquisar</label>
            <input
              type='text'
              className='form-control'
              placeholder='Cliente, veículo, responsável...'
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {/* BOTÃO LIMPAR FILTROS */}
        <div className='mt-3'>
          <button
            className='btn btn-outline-secondary btn-sm'
            onClick={() => {
              setBusca('');
              setDataFiltro('');
              setStatusFiltro('');
            }}
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className='card p-3'>
        {ordensFiltradas.length === 0 ? (
          <div className='text-center p-5'>
            <h5>Nenhum resultado encontrado</h5>
            <p>Cadastre uma nova ordem de serviço</p>
          </div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Veículo</th>
                <th>Responsável</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {ordensFiltradas.map((os) => (
                <tr key={os.id}>
                  <td>{os.id}</td>
                  <td>{new Date(os.dataInicio).toLocaleDateString('pt-BR')}</td>
                  <td>{os.cliente?.nome}</td>
                  <td>
                    {os.veiculo
                      ? `${os.veiculo.modelo} - ${os.veiculo.placa}`
                      : 'N/A'}
                  </td>
                  <td>{os.funcionario?.nome}</td>
                  <td>
                    <select
                      className={`form-select form-select-sm ${
                        os.status === 'Aberta'
                          ? 'text-primary'
                          : os.status === 'Em andamento'
                            ? 'text-warning'
                            : os.status === 'Finalizada'
                              ? 'text-success'
                              : ''
                      }`}
                      value={os.status}
                      onChange={(e) => alterarStatus(os.id, e.target.value)}
                      style={{ minWidth: '140px' }}
                    >
                      <option value='Aberta'>Aberta</option>
                      <option value='Em andamento'>Em andamento</option>
                      <option value='Finalizada'>Finalizada</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className='btn btn-sm btn-primary me-1'
                      onClick={() => navigate(`/os/${os.id}`)}
                    >
                      Ver
                    </button>
                    <button
                      className='btn btn-sm btn-warning me-1'
                      onClick={() => navigate(`/os/editar/${os.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => excluirOS(os.id)}
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
