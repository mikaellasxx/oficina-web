import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OsForm() {
  const { id } = useParams(); // Pega o ID da URL se for edição
  const navigate = useNavigate();
  const [os, setOs] = useState({
    clienteId: '',
    veiculoId: '',
    funcionarioId: '',
    status: 'Aberta',
    descricao: '',
    observacoes: '',
    itens: [],
  });

  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [itemAtual, setItemAtual] = useState({
    tipo: 'Servico',
    itemId: '',
    quantidade: 1,
  });

  // ✅ CORRETO: TODOS OS FETCH DENTRO DO useEffect
  useEffect(() => {
    fetch('http://localhost:5008/api/Clientes')
      .then((res) => res.json())
      .then(setClientes);

    fetch('http://localhost:5008/api/Veiculos')
      .then((res) => res.json())
      .then(setVeiculos);

    fetch('http://localhost:5008/api/Funcionarios')
      .then((res) => res.json())
      .then(setFuncionarios);

    fetch('http://localhost:5008/api/Pecas')
      .then((res) => res.json())
      .then(setPecas);

    fetch('http://localhost:5008/api/Servicos')
      .then((res) => res.json())
      .then(setServicos);
  }, []);

  // ✅ NOVO: Carregar OS para edição se ID existir
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5008/api/OrdensServico/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOs({
            clienteId: data.clienteId,
            veiculoId: data.veiculoId,
            funcionarioId: data.funcionarioId,
            status: data.status,
            descricao: data.descricao,
            observacoes: data.observacoes,
            itens: data.itens.map((item) => ({
              tipo: item.tipo,
              itemId: item.itemId,
              quantidade: item.quantidade,
            })),
          });
        });
    }
  }, [id]);

  // ✅ NOVO: adicionar item na OS
  function adicionarItem() {
    if (!itemAtual.itemId) {
      alert('Selecione um item');
      return;
    }

    setOs({
      ...os,
      itens: [...os.itens, itemAtual],
    });

    // limpa o item depois de adicionar
    setItemAtual({
      tipo: 'Servico',
      itemId: '',
      quantidade: 1,
    });
  }

  // ✅ NOVO: calcular total (só visual - backend já calcula)
  function calcularTotal() {
    return os.itens.reduce((total, item) => {
      const lista = item.tipo === 'Servico' ? servicos : pecas;
      const info = lista.find((i) => i.id === item.itemId);

      if (!info) return total;

      return total + info.preco * item.quantidade;
    }, 0);
  }

  // ✅ NOVO: salvar OS (POST ou PUT)
  function salvarOS() {
    if (!os.clienteId || !os.veiculoId || !os.funcionarioId) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:5008/api/OrdensServico/${id}`
      : 'http://localhost:5008/api/OrdensServico';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(os),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then(() => {
        alert(`OS ${id ? 'atualizada' : 'criada'} com sucesso!`);
        navigate('/os'); // Volta para a lista
      })
      .catch((err) => {
        console.error(err);
        alert('Erro ao salvar OS');
      });
  }

  const veiculosFiltrados = veiculos.filter(
    (v) => v.clienteId === os.clienteId,
  );

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>
        📋 {id ? 'Editar' : 'Nova'} Ordem de Serviço
      </h1>

      <div className='card p-3 mb-3'>
        <div className='row'>
          {/* CLIENTE */}
          <div className='col-md-4 mb-2'>
            <label>Cliente</label>
            <select
              className='form-control'
              value={os.clienteId}
              onChange={(e) =>
                setOs({
                  ...os,
                  clienteId: Number(e.target.value),
                  veiculoId: '', // limpa veículo ao mudar cliente
                })
              }
            >
              <option value=''>Selecione</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          {/* VEÍCULO */}
          <div className='col-md-4 mb-2'>
            <label>Veículo</label>
            <select
              className='form-control'
              value={os.veiculoId}
              onChange={(e) =>
                setOs({ ...os, veiculoId: Number(e.target.value) })
              }
            >
              <option value=''>Selecione</option>
              {veiculosFiltrados.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.modelo} - {v.placa}
                </option>
              ))}
            </select>
          </div>

          {/* FUNCIONÁRIO */}
          <div className='col-md-4 mb-2'>
            <label>Responsável</label>
            <select
              className='form-control'
              value={os.funcionarioId}
              onChange={(e) =>
                setOs({ ...os, funcionarioId: Number(e.target.value) })
              }
            >
              <option value=''>Selecione</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}
          <div className='col-md-4 mb-2'>
            <label>Status</label>
            <select
              className='form-control'
              value={os.status}
              onChange={(e) => setOs({ ...os, status: e.target.value })}
            >
              <option>Aberta</option>
              <option>Em andamento</option>
              <option>Finalizada</option>
            </select>
          </div>

          {/* DESCRIÇÃO */}
          <div className='col-md-8 mb-2'>
            <label>Descrição</label>
            <input
              className='form-control'
              value={os.descricao}
              onChange={(e) => setOs({ ...os, descricao: e.target.value })}
            />
          </div>

          {/* OBSERVAÇÕES */}
          <div className='col-md-12 mb-2'>
            <label>Observações</label>
            <textarea
              className='form-control'
              value={os.observacoes}
              onChange={(e) => setOs({ ...os, observacoes: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* ITENS */}
      <div className='card p-3 mb-3'>
        <h5>Itens da Ordem</h5>

        <div className='row'>
          <div className='col-md-3'>
            <select
              className='form-control'
              value={itemAtual.tipo}
              onChange={(e) =>
                setItemAtual({ ...itemAtual, tipo: e.target.value })
              }
            >
              <option value='Servico'>Serviço</option>
              <option value='Peca'>Peça</option>
            </select>
          </div>

          <div className='col-md-4'>
            <select
              className='form-control'
              value={itemAtual.itemId}
              onChange={(e) =>
                setItemAtual({
                  ...itemAtual,
                  itemId: Number(e.target.value),
                })
              }
            >
              <option value=''>Selecione</option>

              {itemAtual.tipo === 'Servico'
                ? servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome} - R$ {s.preco}
                    </option>
                  ))
                : pecas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} - R$ {p.preco}
                    </option>
                  ))}
            </select>
          </div>

          <div className='col-md-2'>
            <input
              type='number'
              className='form-control'
              value={itemAtual.quantidade}
              onChange={(e) =>
                setItemAtual({
                  ...itemAtual,
                  quantidade: Number(e.target.value),
                })
              }
            />
          </div>

          <div className='col-md-3'>
            <button className='btn btn-primary w-100' onClick={adicionarItem}>
              + Adicionar
            </button>
          </div>
        </div>

        {/* LISTA */}
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Item</th>
              <th>Qtd</th>
            </tr>
          </thead>

          <tbody>
            {os.itens.map((item, index) => {
              const lista = item.tipo === 'Servico' ? servicos : pecas;
              const info = lista.find((i) => i.id === item.itemId);

              return (
                <tr key={index}>
                  <td>{item.tipo}</td>
                  <td>{info?.nome}</td>
                  <td>{item.quantidade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* TOTAL */}
        <h5 className='text-end'>Total: R$ {calcularTotal()}</h5>
      </div>

      {/* BOTÃO SALVAR */}
      <button className='btn btn-primary' onClick={salvarOS}>
        {id ? 'Atualizar' : 'Salvar'} Ordem de Serviço
      </button>
    </div>
  );
}
