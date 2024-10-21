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
                const response = await api.get(`http://localhost:3000/users/content/${id}`); // Ajustar para incluir '/users'
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
        <div>
            <h1>{content.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
    );
};

export default ReadContent;