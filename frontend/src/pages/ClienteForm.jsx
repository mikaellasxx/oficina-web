import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClienteForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se for edição
  const isEditando = !!id; // True se estiver editando

  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    documento: '',
    endereco: '',
    veiculos: [],
  });

  const [veiculo, setVeiculo] = useState({
    placa: '',
    modelo: '',
    marca: '',
    anoFabricacao: '',
    cor: '',
    combustivel: '',
    quilometragem: '',
  });

  useEffect(() => {
    if (isEditando) {
      fetch(`http://localhost:5008/api/Clientes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCliente({
            nome: data.nome,
            telefone: data.telefone,
            email: data.email,
            documento: data.documento,
            endereco: data.endereco,
            veiculos: data.veiculos || [],
          });
        })
        .catch((err) => console.error('Erro ao buscar cliente:', err));
    }
  }, [id, isEditando]);

  // atualizar cliente
  function handleClienteChange(e) {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  }

  // atualizar veículo temporário
  function handleVeiculoChange(e) {
    setVeiculo({ ...veiculo, [e.target.name]: e.target.value });
  }

  // adicionar veículo na lista
  function adicionarVeiculo() {
    if (!veiculo.placa || !veiculo.modelo) return;

    setCliente({
      ...cliente,
      veiculos: [...cliente.veiculos, veiculo],
    });

    // limpa o form do veículo
    setVeiculo({
      placa: '',
      modelo: '',
      marca: '',
      anoFabricacao: '',
      cor: '',
      combustivel: '',
      quilometragem: '',
    });
  }

  // salvar cliente
  function salvar() {
    const url = isEditando
      ? `http://localhost:5008/api/Clientes/${id}`
      : 'http://localhost:5008/api/Clientes';

    const metodo = isEditando ? 'PUT' : 'POST';

    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then((res) => {
        console.log('STATUS:', res.status);
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then((data) => {
        console.log('SALVO:', data);
        alert(
          isEditando
            ? 'Cliente atualizado com sucesso!'
            : 'Cliente cadastrado com sucesso!',
        );
        navigate('/clientes');
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Erro ao salvar cliente');
      });
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>
        👤 {isEditando ? 'Editar' : 'Novo'} Cliente
      </h1>

      {/* DADOS DO CLIENTE */}
      <div className='card p-3 mb-3'>
        <h5>Dados do Cliente</h5>

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <input
              name='nome'
              className='form-control'
              placeholder='Nome'
              value={cliente.nome}
              onChange={handleClienteChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='telefone'
              className='form-control'
              placeholder='Telefone'
              value={cliente.telefone}
              onChange={handleClienteChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='email'
              className='form-control'
              placeholder='Email'
              value={cliente.email}
              onChange={handleClienteChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='documento'
              className='form-control'
              placeholder='CPF/CNPJ'
              value={cliente.documento}
              onChange={handleClienteChange}
            />
          </div>

          <div className='col-md-12 mb-2'>
            <input
              name='endereco'
              className='form-control'
              placeholder='Endereço'
              value={cliente.endereco}
              onChange={handleClienteChange}
            />
          </div>
        </div>
      </div>

      {/* VEÍCULOS */}
      <div className='card p-3 mb-3'>
        <h5>Veículos</h5>

        <div className='row'>
          <div className='col-md-3 mb-2'>
            <input
              name='placa'
              className='form-control'
              placeholder='Placa'
              value={veiculo.placa}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='modelo'
              className='form-control'
              placeholder='Modelo'
              value={veiculo.modelo}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='marca'
              className='form-control'
              placeholder='Marca'
              value={veiculo.marca}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='anoFabricacao'
              className='form-control'
              placeholder='Ano'
              value={veiculo.anoFabricacao}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='cor'
              className='form-control'
              placeholder='Cor'
              value={veiculo.cor}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='combustivel'
              className='form-control'
              placeholder='Combustível'
              value={veiculo.combustivel}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <input
              name='quilometragem'
              className='form-control'
              placeholder='KM'
              value={veiculo.quilometragem}
              onChange={handleVeiculoChange}
            />
          </div>

          <div className='col-md-3 mb-2'>
            <button
              className='btn btn-primary w-100'
              onClick={adicionarVeiculo}
            >
              + Adicionar
            </button>
          </div>
        </div>

        {/* LISTA DE VEÍCULOS */}
        <ul className='mt-3'>
          {cliente.veiculos.map((v, index) => (
            <li key={index}>
              {v.modelo} - {v.placa}
            </li>
          ))}
        </ul>
      </div>

      {/* SALVAR */}
      <button className='btn btn-primary' onClick={salvar}>
        {isEditando ? 'Atualizar Cliente' : 'Salvar Cliente'}
      </button>
    </div>
  );
}
