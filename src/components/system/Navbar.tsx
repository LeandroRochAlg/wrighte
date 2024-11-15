import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  onLogout: () => void; // Função chamada ao fazer logout
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
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
          <li>
            <Link className="hover:text-gray-300" to="/editor">
              Novo Texto
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/about">
              Sobre
            </Link>
          </li>
        </ul>

        {/* Autenticação */}
        <div className="text-white">
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