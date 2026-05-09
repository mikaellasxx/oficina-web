import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({
  usuario,
  setUsuario,
  senha,
  setSenha,
  erro,
  handleLogin,
  tema,
  toggleTema,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('logado') === 'true') {
      navigate('/');
    }
  }, []);

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div
      className={`login-page ${tema} vh-100 d-flex justify-content-center align-items-center`}
    >
      {/* BOTÃO TEMA */}
      {/* <button className={`theme-toggle ${tema}`} onClick={toggleTema}>
        <i className={tema === 'dark' ? 'bi bi-sun' : 'bi bi-moon'}></i>
      </button> */}

      <div className='card p-4 shadow login-card'>
        <h3 className='text-center mb-4'>CodeDrive Automotive</h3>

        <h5 className='mb-4'>Informe seus dados</h5>

        {erro && <div className='alert alert-danger'>{erro}</div>}

        <div className='mb-3'>
          <label className='form-label'>Usuário</label>

          <input
            type='text'
            className='form-control'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Senha</label>

          <input
            type='password'
            className='form-control'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className='mb-3'>
          <a href='#' className='text-decoration-none'>
            Esqueci minha senha
          </a>
        </div>

        <button
          className='btn btn-primary w-100 mb-3'
          onClick={handleLogin}
          disabled={!usuario || !senha}
        >
          Entrar
        </button>

        <a href='#' className='text-decoration-none text-center'>
          Criar Conta
        </a>
      </div>
    </div>
  );
}
