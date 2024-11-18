import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

interface Content {
    contentID: number;
    title: string;
    versionCount: number;
    commentsCount: number;
}

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<Content[]>([]); // Ajuste o tipo conforme necessário
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);

            // Busca os conteúdos do usuário
            api.get(`/texts/user-contents/${storedUsername}`)
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
        <div className='flex flex-col w-[700px] mx-auto '>
            <h1 className='text-4xl font-bold text-center text-blue-500 my-2'>Bem-vindo(a) ao WrightE, {username}!</h1>
            <main className='w-[500px] mx-auto my-3'>
                <h2 className='text-3xl px-2'>Seus textos:</h2>
                <ul className='mt-2'>
                    {contents.map((content) => (
                        <li
                            key={content.contentID}
                            className='flex items-center justify-between p-1 my-2 rounded-lg cursor-pointer border border-pink-50 hover:bg-pink-50'
                            onClick={() => handleContentClick(content.contentID)}
                        >
                            <span className='font-bold'>{content.title}</span>
                            <div className='flex items-center space-x-2'>
                                <span>{content.versionCount} versões</span>
                                <span>{content.commentsCount} comentários</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default MainPage;