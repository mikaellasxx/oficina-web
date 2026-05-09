import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import ClienteForm from './pages/ClienteForm';
import Servicos from './pages/Servicos';
import ServicoForm from './pages/ServicoForm';
import Pecas from './pages/Pecas';
import PecaForm from './pages/PecaForm';
import Os from './pages/Os';
import OsForm from './pages/OsForm';
import OsDetalhe from './pages/OsDetalhes';
import Fornecedores from './pages/Fornecedores';
import FornecedorForm from './pages/FornecedorForm';
import Funcionarios from './pages/Funcionarios';
import FuncionarioForm from './pages/FuncionarioForm';

import './App.css';

function App() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const [logado, setLogado] = useState(
    localStorage.getItem('logado') === 'true',
  );

  const [tema, setTema] = useState(localStorage.getItem('tema') || 'dark');

  useEffect(() => {
    localStorage.setItem('tema', tema);
  }, [tema]);

  function handleLogin() {
    if (!usuario || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (usuario === 'mikaella' && senha === '123') {
      setErro('');
      setLogado(true);
      localStorage.setItem('logado', 'true');
      navigate('/');
    } else {
      setErro('Usuário ou senha inválidos');
    }
  }

  function handleLogout() {
    setLogado(false);
    localStorage.removeItem('logado');
    setUsuario('');
    setSenha('');
    navigate('/login');
  }

  function toggleTema() {
    setTema(tema === 'dark' ? 'light' : 'dark');
  }

  function RotaProtegida({ children }) {
    if (!logado) {
      return <Navigate to='/login' />;
    }
    return children;
  }

  // ✅ LAYOUT (SIDEBAR + TOPBAR)
  function Layout() {
    return (
      <div className={`app ${tema} vh-100 d-flex flex-column`}>
        <Topbar onLogout={handleLogout} tema={tema} toggleTema={toggleTema} />

        <div className='d-flex flex-fill'>
          <Sidebar onLogout={handleLogout} />

          <div className='content-area flex-fill p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path='/login'
        element={
          <Login
            usuario={usuario}
            setUsuario={setUsuario}
            senha={senha}
            setSenha={setSenha}
            erro={erro}
            handleLogin={handleLogin}
            tema={tema}
            toggleTema={toggleTema}
          />
        }
      />

      {/* ROTAS PROTEGIDAS */}
      <Route
        element={
          <RotaProtegida>
            <Layout />
          </RotaProtegida>
        }
      >
        <Route path='/' element={<Dashboard />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/clientes/novo' element={<ClienteForm />} />
        <Route path='/clientes/editar/:id' element={<ClienteForm />} />
        <Route path='/servicos' element={<Servicos />} />
        <Route path='/servicos/novo' element={<ServicoForm />} />
        <Route path='/pecas' element={<Pecas />} />
        <Route path='/pecas/nova' element={<PecaForm />} />
        <Route path='/pecas/editar/:id' element={<PecaForm />} />
        <Route path='/os' element={<Os />} />
        <Route path='/os/novo' element={<OsForm />} />
        <Route path='/os/editar/:id' element={<OsForm />} />
        <Route path='/os/:id' element={<OsDetalhe />} />
        <Route path='/fornecedores' element={<Fornecedores />} />
        <Route path='/fornecedores/novo' element={<FornecedorForm />} />
        <Route path='/funcionarios' element={<Funcionarios />} />
        <Route path='/funcionarios/novo' element={<FuncionarioForm />} />
        <Route path='/funcionarios/editar/:id' element={<FuncionarioForm />} />
      </Route>
    </Routes>
  );
}

export default App;
