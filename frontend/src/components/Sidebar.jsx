import { NavLink } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  const itens = [
    { to: '/', icon: 'bi-grid-1x2', label: 'Início', end: true },
    { to: '/clientes', icon: 'bi-people', label: 'Clientes' },
    { to: '/servicos', icon: 'bi-hand-thumbs-up', label: 'Serviços' },
    { to: '/pecas', icon: 'bi-tools', label: 'Peças' },
    { to: '/os', icon: 'bi-clipboard-check', label: 'Ordens de Serviço' },
    { to: '/fornecedores', icon: 'bi-truck', label: 'Fornecedores' },
    { to: '/funcionarios', icon: 'bi-person-gear', label: 'Funcionários' },
  ];

  return (
    <aside className='sidebar'>
      <nav className='sidebar-nav' aria-label='Menu principal'>
        {itens.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            <i className={`bi ${item.icon}`} aria-hidden='true'></i>
            <span>{item.label}</span>
            <i className='bi bi-chevron-right sidebar-chevron'></i>
          </NavLink>
        ))}

        <div className='sidebar-footer'>
          <button
            className='sidebar-link sidebar-logout'
            onClick={onLogout}
          >
            <i className='bi bi-box-arrow-right' aria-hidden='true'></i>
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
