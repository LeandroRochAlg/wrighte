import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import WritingPointsBadge from '../components/system/WritingPointsBadge';

interface Content {
    contentID: number;
    username: string;
    title: string;
    versionCount: number;
    commentsCount: number;
    writingPoints: number;
}

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<Content[]>([]); // Lista de textos
    const [username, setUsername] = useState<string | null>(null); // Nome do usuário
    const [role, setRole] = useState<string>('writer'); // Modo atual: writer ou editor

    // Carrega os textos e o modo ao montar o componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);

            const storedRole = localStorage.getItem('role') || 'writer';
            setRole(storedRole);

            const endpoint =
                storedRole === 'writer'
                    ? `/texts/user-contents/${storedUsername}` // Busca textos do usuário
                    : '/texts/all-contents'; // Busca todos os textos para editores

            // Faz a chamada API com base no endpoint definido
            api.get(endpoint)
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

    const handleCreateNewText = () => {
        navigate('/editor');
    };

    return (
        document.title = "Página inicial • WrightE",
        <div className='flex flex-col w-[700px] mx-auto '>
            <h1 className='text-4xl font-bold text-center text-blue-500 my-2'>Bem-vindo(a) ao WrightE, {username}!</h1>
            <main className='w-[500px] mx-auto my-3'>
                {role === 'writer' ? (
                    <>
                        {/* Interface para Escritor */}
                        <h2 className='text-3xl px-2'>Seus textos:</h2>
                        <ul className='mt-2'>
                            {contents.map((content) => (
                                <li
                                    key={content.contentID}
                                    className='flex items-center justify-between p-1 my-2 rounded-lg cursor-pointer border border-pink-500 hover:bg-pink-500'
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
                        <button
                            onClick={handleCreateNewText}
                            className='mt-4 py-2 px-4 bg-green-500 hover:bg-green-700 text-white rounded-md'
                        >
                            Criar Novo Texto
                        </button>
                    </>
                ) : (
                    <>
                        {/* Interface para Editor */}
                        <h2 className='text-3xl px-2'>Textos de outros escritores:</h2>
                        <ul className='mt-2'>
                            {contents.map((content) => (
                                <li
                                    className='cursor-pointer my-1 font-bold hover:bg-yellow-50 border border-yellow-50 px-2 rounded-md'
                                    key={content.contentID}
                                    onClick={() => handleContentClick(content.contentID)}
                                >
                                    <div className='flex flex-col'>
                                        <span>{content.title}</span>
                                        <span className='text-sm text-gray-500'>
                                            Por: {content.username} {/* Nome do escritor */}
                                            <WritingPointsBadge writingPoints={content.writingPoints} />
                                        </span>
                                        <div className='flex items-center text-xs justify-between'>
                                            <div className='space-x-2'>
                                                <span>{content.versionCount} versões</span>
                                                <span>{content.commentsCount} comentários</span>
                                            </div>
                                            <button
                                                className='text-sm text-blue-500 underline hover:text-blue-50 mt-1'
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Impede que o clique abra o texto
                                                    navigator.clipboard.writeText(
                                                        `${window.location.origin}/content/${content.contentID}`
                                                    );
                                                    alert('Link copiado para o clipboard!');
                                                }}
                                            >
                                                Copiar Link
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </main>
        </div>
    );
};

export default MainPage;