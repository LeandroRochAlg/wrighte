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
            api.get('/texts/contents')
                .then((response) => {
                    setContents(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar conteúdos:', error);
                });
        }
    }, [navigate]);

    const handleContentClick = (id: number) => {
        navigate(`/content/${id}`);
    };

    return (document.title = "Página inicial • WrightE",
        <div className='flex flex-col w-[700px] mx-auto'>
            <h1 className='text-4xl font-bold text-center text-blue-700 my-2'>Bem-Vindo ao WrightE, {username}</h1>
            <main className='w-[500px] mx-auto my-3'>
                <h2 className='text-3xl px-2'>Seus Textos</h2>
                <ul className='mt-2'>
                    {contents.map((content) => (
                        <li className='cursor-pointer my-1 font-bold hover:bg-slate-200 px-2 rounded-md' key={content.id} onClick={() => handleContentClick(content.id)}>
                            {content.title}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default MainPage;