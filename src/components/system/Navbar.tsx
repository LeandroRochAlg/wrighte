import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  onLogout: () => void; // Função chamada ao fazer logout
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [role, setRole] = useState<string>('writer'); // Estado para rastrear a função ativa

  // Carrega a função do localStorage ao montar o componente
  useEffect(() => {
    if (isAuthenticated) {
      const storedRole = localStorage.getItem('role') || 'writer';
      setRole(storedRole);
    }
  }, [isAuthenticated]);

  // Alterna entre as funções writer/editor
  const toggleRole = () => {
    const newRole = role === 'writer' ? 'editor' : 'writer';
    setRole(newRole);
    localStorage.setItem('role', newRole); // Salva no localStorage
    window.location.reload(); // Recarrega a página para refletir as mudanças
  };

  return (
    <nav className="bg-blue-500 p-4 text-white-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">WrightE</Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-4 text-white">
          <li>
            <Link className="hover:text-gray-300" to="/">
              Textos
            </Link>
          </li>
          {role === 'writer' && (
            <li>
              <Link className="hover:text-gray-300" to="/editor">
              Novo Texto
              </Link>
            </li>
          )}
          <li>
            <Link className="hover:text-gray-300" to="/about">
              Sobre
            </Link>
          </li>
        </ul>

        {/* Botão de alternância de função e autenticação */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <button
              onClick={toggleRole}
              className={`py-2 px-4 rounded ${
                role === 'writer' ? 'bg-green-500' : 'bg-yellow-500'
              } hover:opacity-80`}
            >
              Modo: {role === 'writer' ? 'Escritor' : 'Editor'}
            </button>
          )}

          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="bg-pink-500 hover:bg-purple-50 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-50 text-white py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;