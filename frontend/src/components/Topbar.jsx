import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Topbar({ onLogout, tema, toggleTema }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const secoes = {
    clientes: 'Clientes',
    servicos: 'Serviços',
    pecas: 'Peças',
    os: 'Ordens de Serviço',
    fornecedores: 'Fornecedores',
    funcionarios: 'Funcionários',
  };
  const segmento = location.pathname.split('/').filter(Boolean)[0];
  const titulo = secoes[segmento] || 'Visão geral';

  return (
    <header className='topbar'>
      <div className='topbar-branding'>
        <div className='logo'>
          <div className='logo-icon'>
            <i className='bi bi-wrench-adjustable' aria-hidden='true'></i>
          </div>
          <div className='logo-copy'>
            <div className='logo-text'>CodeDrive Automotive</div>
            <small>Gestão da oficina</small>
          </div>
        </div>
        <div className='topbar-divider' aria-hidden='true'></div>
        <div className='topbar-section'>{titulo}</div>
      </div>

      <div className='topbar-actions'>
        <button
          type='button'
          className='user-button'
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-label='Abrir menu do usuário'
        >
          <span className='user-avatar'>M</span>
          <span className='user-copy'>
            <strong>Mikaella</strong>
            <small>Administradora</small>
          </span>
          <i className={`bi bi-chevron-${menuAberto ? 'up' : 'down'}`}></i>
        </button>

        {menuAberto && (
          <div className='user-menu'>
            <button type='button' className='menu-item' onClick={toggleTema}>
              <i className={`bi ${tema === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
              Alternar tema
            </button>
            <button type='button' className='menu-item danger' onClick={onLogout}>
              <i className='bi bi-box-arrow-right'></i>
              Sair do sistema
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
