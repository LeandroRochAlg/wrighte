import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import { Editor } from '@tinymce/tinymce-react';
import VersionModal from '../components/system/VersionModal';

interface Version {
    id: string;
    date: string;
}

interface Content {
    title: string;
    content: string;
}

const ReadContent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para erros
    const [showVersions, setShowVersions] = useState<boolean>(false);
    const [versions, setVersions] = useState<Version[]>([]); // Lista de versões
    const [currentVersion, setCurrentVersion] = useState<string>(''); // Versão atual

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/texts/content/${id}`); // Buscar o conteúdo
                setContent(response.data);
                setCurrentVersion(response.data.lastVersion);
            } catch (error: any) {
                console.error('Erro ao buscar conteúdo:', error);
                if (error.response) {
                    setError(error.response.data.message || 'Erro ao buscar conteúdo');
                } else {
                    setError('Erro inesperado');
                }
            }
        };

        const fetchVersions = async () => {
            try {
                const response = await api.get(`/texts/content-versions-list/${id}`); // Buscar as versões
                setVersions(response.data);
            } catch (error: any) {
                console.error('Erro ao buscar versões:', error);
            }
        };

        fetchContent();
        fetchVersions();
    }, [id]);

    if (error) return <div>{error}</div>; // Exibe mensagem de erro
    if (!content) return <div>Carregando...</div>;

    return (
        <div className='flex flex-col w-[700px] mx-auto mt-3 relative'>
            <div className='flex flex-row justify-between h-[50px]'>
                <h1 className='text-xl my-auto'><span className='font-bold'>Título: </span>{content.title}</h1>
                <div className='relative'>
                    <button
                        className='p-2 hover:bg-slate-300 my-auto rounded-lg text-sm'
                        onClick={() => setShowVersions(!showVersions)}
                    >
                        {`${currentVersion.slice(0, 3)}...${currentVersion.slice(-3)}`}
                    </button>

                    {/* Componente VersionModal */}
                    <VersionModal
                        versions={versions}
                        currentVersion={currentVersion}
                        show={showVersions}
                        onClose={() => setShowVersions(false)}
                    />
                </div>
            </div>
            <hr />
            <div className='mt-5'>
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
                    value={content.content}
                    init={{
                        menubar: false,
                        toolbar: false,
                        height: 600,
                    }}
                    disabled={true}
                />
            </div>
            <a href={`/edit/${id}`} className='my-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold'>
                Editar texto
            </a>
        </div>
    );
};

export default ReadContent;