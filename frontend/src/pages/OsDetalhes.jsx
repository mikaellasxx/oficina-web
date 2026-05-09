import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OsDetalhe() {
  const { id } = useParams();
  const [os, setOs] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5008/api/OrdensServico/${id}`)
      .then((res) => res.json())
      .then(setOs);
  }, [id]);

  if (!os) return <p>Carregando...</p>;

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>📋 Ordem de Serviço #{os.id}</h1>

      {/* CLIENTE */}
      <div className='card p-3 mb-3'>
        <h5>Cliente</h5>
        <p>
          <strong>{os.cliente?.nome}</strong>
        </p>
        <p>{os.cliente?.telefone}</p>
      </div>

      {/* VEÍCULO */}
      <div className='card p-3 mb-3'>
        <h5>Veículo</h5>
        <p>
          {os.veiculo?.modelo} - {os.veiculo?.placa}
        </p>
      </div>

      {/* ITENS */}
      <div className='card p-3 mb-3'>
        <h5>Itens</h5>

        <table className='table'>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Item</th>
              <th>Qtd</th>
              <th>Valor</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {os.itens.map((i) => (
              <tr key={i.id}>
                <td>{i.tipo}</td>
                <td>{i.descricao}</td>
                <td>{i.quantidade}</td>
                <td>R$ {i.valor}</td>
                <td>R$ {i.valor * i.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h5 className='text-end'>Total: R$ {os.valorTotal}</h5>
      </div>

      {/* OBS */}
      <div className='card p-3 mb-3'>
        <h5>Observações</h5>
        <p>{os.observacoes}</p>
      </div>

      {/* BOTÃO */}
      <button className='btn btn-primary' onClick={() => window.print()}>
        Imprimir
      </button>
    </div>
  );
}
