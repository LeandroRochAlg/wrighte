import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../system/Navbar';
import Footer from '../system/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') ? true : false;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove o username ao sair
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      {/* Conteúdo principal */}
      <main className="flex-grow">{children}</main>
      
      {/* Footer sempre no final */}
      <Footer />
    </div>
  );
};

export default Layout;