import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleNewBook = () => {
        navigate('/editor');
    };

    return (
        <div>
            <h1>Bem Vindo ao WrightE</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleNewBook}>Novo Texto</button>
        </div>
    );
};

export default MainPage;