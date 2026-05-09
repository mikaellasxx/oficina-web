import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FornecedorForm() {
  const navigate = useNavigate();

  const [fornecedor, setFornecedor] = useState({
    nome: '',
    telefone: '',
    documento: '',
    email: '',
    endereco: '',
  });

  // atualizar fornecedor
  function handleFornecedorChange(e) {
    setFornecedor({ ...fornecedor, [e.target.name]: e.target.value });
  }

  // salvar fornecedor
  function salvar() {
    fetch('http://localhost:5008/api/Fornecedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecedor),
    })
      .then((res) => {
        console.log('STATUS:', res.status);
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then((data) => {
        console.log('SALVO:', data);
        alert('Fornecedor cadastrado com sucesso!');
        navigate('/fornecedores');
        window.location.reload();
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Erro ao salvar fornecedor');
      });
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>🏭 Novo Fornecedor</h1>

      {/* DADOS DO FORNECEDOR */}
      <div className='card p-3 mb-3'>
        <h5>Dados do Fornecedor</h5>

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <input
              name='nome'
              className='form-control'
              placeholder='Nome'
              onChange={handleFornecedorChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='telefone'
              className='form-control'
              placeholder='Telefone'
              onChange={handleFornecedorChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='email'
              className='form-control'
              placeholder='Email'
              onChange={handleFornecedorChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='documento'
              className='form-control'
              placeholder='CPF/CNPJ'
              onChange={handleFornecedorChange}
            />
          </div>

          <div className='col-md-12 mb-2'>
            <input
              name='endereco'
              className='form-control'
              placeholder='Endereço'
              onChange={handleFornecedorChange}
            />
          </div>
        </div>
      </div>

      {/* SALVAR */}
      <button className='btn btn-primary' onClick={salvar}>
        Salvar Fornecedor
      </button>
    </div>
  );
}
