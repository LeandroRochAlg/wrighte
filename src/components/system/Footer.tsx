import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 p-4 text-white mt-2 w-full text-white-50 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Links de Navegação */}
        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <Link className="hover:text-gray-300" to="/terms">
              Termos de Uso
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/privacy">
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300" to="/contact">
              Contato
            </Link>
          </li>
        </ul>

        {/* Direitos Reservados */}
        <div className="text-sm">
          © {new Date().getFullYear()} WrightE. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;