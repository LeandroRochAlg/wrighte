import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<any[]>([]); // Ajuste o tipo conforme necessário
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);

            // Busca os conteúdos do usuário
            api.get('/users/contents')
                .then((response) => {
                    setContents(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar conteúdos:', error);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Remove o username ao sair
        navigate('/login');
    };

    const handleContentClick = (id: number) => {
        navigate(`/content/${id}`);
    };

    return (
        <div>
            <h1>Bem Vindo ao WrightE, {username}</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/editor')}>Novo Texto</button>

            <h2>Seus Textos</h2>
            <ul>
                {contents.map((content) => (
                    <li key={content.id} onClick={() => handleContentClick(content.id)}>
                        {content.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;