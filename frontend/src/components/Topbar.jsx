import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Topbar({ onLogout, tema, toggleTema }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  // CONFIGURAÇÃO POR PÁGINA
  const paginas = {
    '/': {
      titulo: 'CodeDrive Automotive',
      botao: 'Novo Registro',
    },
    '/clientes': {
      titulo: 'Clientes',
      botao: 'Novo Registro',
    },
    '/servicos': {
      titulo: 'Serviços',
      botao: 'Novo Registro',
    },
    '/pecas': {
      titulo: 'Peças e Serviços',
      botao: 'Novo Registro',
    },
    '/os': {
      titulo: 'Ordens de Serviço',
      botao: 'Novo Registro',
    },
    '/fornecedores': {
      titulo: 'Fornecedores',
      botao: 'Novo Registro',
    },
    '/funcionarios': {
      titulo: 'Funcionários',
      botao: 'Novo Registro',
    },

    // fallback
    default: {
      titulo: 'CodeDrive Automotive',
    },
  };

  const paginaAtual = paginas[location.pathname] || paginas.default;
  return (
    <div className='topbar d-flex align-items-center justify-content-between px-5 py-3'>
      {/* ESQUERDA - LOGOTIPO + TÍTULO DINÂMICO */}
      <div className='d-flex align-items-center gap-4'>
        <div className='logo d-flex align-items-center gap-2 p'>
          <div className='logo-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center'>
            <i className='bi bi-wrench-adjustable'></i>
          </div>
          <div>
            <div className='logo-text fw-bold mb-0'>CodeDrive Automotive</div>
            <small className='text-muted'>Oficina Web</small>
          </div>
        </div>

        {/* TÍTULO DA PÁGINA */}
        {paginaAtual.titulo &&
          paginaAtual.titulo !== 'CodeDrive Automotive' && (
            <div
              className='d-flex align-items-center ps-4'
              style={{
                borderLeft: '2px solid #0d6efd',
              }}
            >
              <h5
                className='mb-0 fw-bold'
                style={{ color: '#0d6efd', fontSize: '18px' }}
              >
                {paginaAtual.titulo}
              </h5>
            </div>
          )}
      </div>

      <div className='d-flex align-items-center gap-3 position-relative'>
        {/* BOTÃO DINÂMICO */}
        {paginaAtual.botao && (
          <button className='btn btn-primary'>
            <i className='bi bi-plus'></i> {paginaAtual.botao}
          </button>
        )}

        {/* USUÁRIO */}
        <div
          className='user d-flex align-items-center'
          style={{ cursor: 'pointer' }}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <i className='bi bi-person-circle'></i>
          <span className='ms-2'>Mikaella</span>
        </div>

        {/* MENU DROPDOWN
        {menuAberto && (
          <div className='user-menu shadow'>
            <div className='p-3 border-bottom'>
              <strong>Mikaella Corrêa</strong>
              <div className='text-muted small'>
                ID suporte: <strong>98031768</strong>
              </div>
            </div>

            <div className='p-3'>
              <div className='menu-item bi bi-person'> Perfil</div>
              <div className='menu-item bi bi-building'> Empresa</div>
              <div className='menu-item bi bi-gear'> Configurações</div>

              <div
                className='menu-item d-flex align-items-center gap-2'
                onClick={toggleTema}
                style={{ cursor: 'pointer' }}
              >
                <i
                  className={`bi ${tema === 'dark' ? 'bi-sun' : 'bi-moon'}`}
                ></i>
                Tema
              </div>
            </div>

            <div className='border-top p-3'>
              <button
                className='btn btn-outline-danger w-100'
                onClick={onLogout}
              >
                <i className='bi bi-box-arrow-right me-2'></i>
                Sair
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
