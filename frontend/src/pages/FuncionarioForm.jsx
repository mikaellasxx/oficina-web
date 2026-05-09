import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FuncionarioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  const [funcionario, setFuncionario] = useState({
    nome: '',
    cargo: '',
    telefone: '',
    email: '',
    endereco: '',
  });

  useEffect(() => {
    if (!isEditando) return;

    fetch(`http://localhost:5008/api/Funcionarios/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFuncionario({
          nome: data.nome || '',
          cargo: data.cargo || '',
          telefone: data.telefone || '',
          email: data.email || '',
          endereco: data.endereco || '',
        });
      })
      .catch((err) => {
        console.error('Erro ao carregar funcionário:', err);
        alert('Não foi possível carregar os dados do funcionário.');
      });
  }, [id, isEditando]);

  // atualizar funcionário
  function handleFuncionarioChange(e) {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  }

  // salvar funcionário
  function salvar() {
    const url = isEditando
      ? `http://localhost:5008/api/Funcionarios/${id}`
      : 'http://localhost:5008/api/Funcionarios';

    const method = isEditando ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario),
    })
      .then((res) => {
        console.log('STATUS:', res.status);
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then((data) => {
        console.log('SALVO:', data);
        alert('Funcionário cadastrado com sucesso!');
        navigate('/funcionarios');
        window.location.reload();
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Erro ao salvar funcionário');
      });
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>
        👷 {isEditando ? 'Editar' : 'Novo'} Funcionário
      </h1>

      {/* DADOS DO FUNCIONÁRIO */}
      <div className='card p-3 mb-3'>
        <h5>Dados do Funcionário</h5>

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <input
              name='nome'
              className='form-control'
              placeholder='Nome'
              value={funcionario.nome}
              onChange={handleFuncionarioChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='cargo'
              className='form-control'
              placeholder='Cargo'
              value={funcionario.cargo}
              onChange={handleFuncionarioChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='telefone'
              className='form-control'
              placeholder='Telefone'
              value={funcionario.telefone}
              onChange={handleFuncionarioChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='email'
              className='form-control'
              placeholder='Email'
              value={funcionario.email}
              onChange={handleFuncionarioChange}
            />
          </div>

          <div className='col-md-12 mb-2'>
            <input
              name='endereco'
              className='form-control'
              placeholder='Endereço'
              value={funcionario.endereco}
              onChange={handleFuncionarioChange}
            />
          </div>
        </div>
      </div>

      {/* SALVAR */}
      <button className='btn btn-primary' onClick={salvar}>
        Salvar Funcionário
      </button>
    </div>
  );
}
