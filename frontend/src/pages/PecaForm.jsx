import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PecaForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se for edição
  const isEditando = !!id; // True se estiver editando

  const [peca, setPeca] = useState({
    nome: '',
    preco: '',
    quantidade: '',
    fornecedorId: '',
  });

  const [fornecedores, setFornecedores] = useState([]);

  // Buscar fornecedores e, se editando, buscar dados da peça
  useEffect(() => {
    fetch('http://localhost:5008/api/Fornecedores')
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((err) => console.error('Erro ao buscar fornecedores:', err));

    // Se estiver editando, buscar dados da peça
    if (isEditando) {
      fetch(`http://localhost:5008/api/Pecas/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPeca({
            nome: data.nome,
            preco: data.preco,
            quantidade: data.quantidade,
            fornecedorId: data.fornecedorId || '',
          });
        })
        .catch((err) => console.error('Erro ao buscar peça:', err));
    }
  }, [id, isEditando]);

  // atualizar peça
  function handlePecaChange(e) {
    setPeca({ ...peca, [e.target.name]: e.target.value });
  }

  // salvar peça
  function salvar() {
    const url = isEditando
      ? `http://localhost:5008/api/Pecas/${id}`
      : 'http://localhost:5008/api/Pecas';

    const metodo = isEditando ? 'PUT' : 'POST';

    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(peca),
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
            ? 'Peça atualizada com sucesso!'
            : 'Peça cadastrada com sucesso!',
        );
        navigate('/pecas');
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Erro ao salvar peça');
      });
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>
        🔧 {isEditando ? 'Editar Peça' : 'Nova Peça'}
      </h1>

      {/* DADOS DA PEÇA */}
      <div className='card p-3 mb-3'>
        <h5>Dados da Peça</h5>

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <input
              name='nome'
              className='form-control'
              placeholder='Nome'
              value={peca.nome}
              onChange={handlePecaChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='preco'
              className='form-control'
              placeholder='Preço'
              value={peca.preco}
              onChange={handlePecaChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='quantidade'
              className='form-control'
              placeholder='Quantidade'
              value={peca.quantidade}
              onChange={handlePecaChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <select
              name='fornecedorId'
              className='form-control'
              value={peca.fornecedorId}
              onChange={handlePecaChange}
            >
              <option value=''>Fornecedor</option>
              {fornecedores.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SALVAR */}
      <button className='btn btn-primary' onClick={salvar}>
        {isEditando ? 'Atualizar Peça' : 'Salvar Peça'}
      </button>
    </div>
  );
}
