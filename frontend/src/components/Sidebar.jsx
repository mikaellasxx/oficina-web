import { Link } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  return (
    <div className='sidebar bg-primary'>
      <ul className='nav flex-column bg-primary'>
        <li className='nav-item pt-1'>
          <Link to='/' className='nav-link text-white'>
            <i className='bi bi-house'></i> Início
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/Clientes' className='nav-link text-white'>
            <i className='bi bi-people'></i> Clientes
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>

        <li className='nav-item'>
          <Link to='/Servicos' className='nav-link text-white'>
            <i className='bi bi-hand-thumbs-up'></i> Serviços
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>

        <li className='nav-item'>
          <Link to='/Pecas' className='nav-link text-white'>
            <i className='bi bi-tools'></i> Peças
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>

        <li className='nav-item'>
          <Link to='/Os' className='nav-link text-white'>
            <i className='bi bi-list'></i> Ordens de Serviço
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>

        <li className='nav-item'>
          <Link to='/Fornecedores' className='nav-link text-white'>
            <i className='bi bi-truck'></i> Fornecedores
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>

        <li className='nav-item'>
          <Link to='/Funcionarios' className='nav-link text-white'>
            <i className='bi bi-person-fill-gear'></i> Funcionários
          </Link>
          <i className='bi bi-chevron-right'></i>
        </li>
        {/* botao de sair */}
        <li className='nav-item mt-auto'>
          <button
            className='nav-link text-white bg-transparent border-0 w-100 text-start'
            onClick={onLogout}
          >
            <i className='bi bi-box-arrow-right'></i> Sair
          </button>
        </li>
      </ul>
    </div>
  );
}
