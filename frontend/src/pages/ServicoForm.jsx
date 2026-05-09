import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicoForm() {
  const navigate = useNavigate();

  const [servico, setServico] = useState({
    nome: '',
    preco: '',
  });

  // atualizar serviço
  function handleServicoChange(e) {
    setServico({ ...servico, [e.target.name]: e.target.value });
  }

  // adicionar serviço na lista
  function adicionarServico() {
    if (!servico.nome || !servico.preco) return;

    setServico({
      ...servico,
      veiculos: [...servico.veiculos, veiculo],
    });
  }

  // salvar serviço
  function salvar() {
    fetch('http://localhost:5008/api/Servicos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico),
    })
      .then((res) => {
        console.log('STATUS:', res.status);
        if (!res.ok) throw new Error('Erro ao salvar');
        return res.json();
      })
      .then((data) => {
        console.log('SALVO:', data);
        alert('Serviço cadastrado com sucesso!');
        navigate('/servicos');
        window.location.reload();
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Erro ao salvar serviço');
      });
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-4'>🛠️ Novo Serviço</h1>

      {/* DADOS DO SERVIÇO */}
      <div className='card p-3 mb-3'>
        <h5>Dados do Serviço</h5>

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <input
              name='nome'
              className='form-control'
              placeholder='Nome'
              onChange={handleServicoChange}
            />
          </div>

          <div className='col-md-6 mb-2'>
            <input
              name='preco'
              className='form-control'
              placeholder='Preço'
              onChange={handleServicoChange}
            />
          </div>
        </div>
      </div>

      {/* SALVAR */}
      <button className='btn btn-primary' onClick={salvar}>
        Salvar Serviço
      </button>
    </div>
  );
}
