import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import DOMPurify from 'dompurify';

const ReadContent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<{ title: string; content: string } | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para erros

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/users/content/${id}`); // Ajustar para incluir '/users'
                setContent(response.data);
            } catch (error: any) {
                console.error('Erro ao buscar conteúdo:', error);
                if (error.response) {
                    setError(error.response.data.message || 'Erro ao buscar conteúdo');
                } else {
                    setError('Erro inesperado');
                }
            }
        };

        fetchContent();
    }, [id]);

    if (error) return <div>{error}</div>; // Exibe mensagem de erro
    if (!content) return <div>Carregando...</div>;

    const sanitizedContent = DOMPurify.sanitize(content.content);

    return (
        <div className='flex flex-col w-[700px] mx-auto mt-3'>
            <h1><span className='font-bold'>Título: </span>{content.title}</h1>
            <hr />
            <div className='mt-5 border border-gray-300 rounded-md p-2 min-h-[600px]' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
    );
};

export default ReadContent;