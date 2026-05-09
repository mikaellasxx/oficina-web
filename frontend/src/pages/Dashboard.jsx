import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [ordens, setOrdens] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pecas, setPecas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5008/api/OrdensServico')
      .then((res) => res.json())
      .then(setOrdens);

    fetch('http://localhost:5008/api/Clientes')
      .then((res) => res.json())
      .then(setClientes);

    fetch('http://localhost:5008/api/Pecas')
      .then((res) => res.json())
      .then(setPecas);
  }, []);

  const abertas = ordens.filter((o) => o.status === 'Aberta').length;
  const andamento = ordens.filter((o) => o.status === 'Em andamento').length;
  const finalizadas = ordens.filter((o) => o.status === 'Finalizada').length;
  const pecasBaixas = pecas.filter((p) => p.quantidade < 10);

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col-12'>
          <h1 className='text-primary mb-3'>🏪 Dashboard</h1>
        </div>
      </div>

      {/* Cards */}
      <div className='row g-4 mb-4'>
        <div className='col-md-4'>
          <div className='card dashboard-card'>
            <div className='card-body'>
              <h6>🔧 OS Abertas</h6>
              <h2>{abertas}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card dashboard-card'>
            <div className='card-body'>
              <h6>⚙️ Em andamento</h6>
              <h2>{andamento}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card dashboard-card'>
            <div className='card-body'>
              <h6>✅ Finalizadas</h6>
              <h2>{finalizadas}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Clientes */}
      <div className='card dashboard-card mb-4'>
        <div className='card-body'>
          <h5 className='mb-3'>Clientes cadastrados</h5>

          <table className='table'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Veículos</th>
              </tr>
            </thead>

            <tbody>
              {clientes.slice(0, 5).map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.telefone}</td>

                  <td>
                    {c.veiculos?.length > 0 ? (
                      c.veiculos.map((v) => (
                        <div key={v.id}>
                          {v.modelo} - {v.placa}
                        </div>
                      ))
                    ) : (
                      <span className='text-muted'>Sem veículos</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas */}
      <div className='card dashboard-card border-danger'>
        <div className='card-body'>
          <h5 className='text-danger mb-3'>Alertas</h5>

          {pecasBaixas.length === 0 ? (
            <p className='text-muted'>Nenhum alerta</p>
          ) : (
            <ul className='list-group list-group-flush'>
              {pecasBaixas.map((p) => (
                <li key={p.id} className='list-group-item text-danger'>
                  ⚠ {p.nome} com estoque baixo ({p.quantidade})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
