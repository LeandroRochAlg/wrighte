import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const { contentID, versionID } = useParams<{ contentID: string, versionID: string | undefined }>();
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para erros
    const [showVersions, setShowVersions] = useState<boolean>(false);
    const [versions, setVersions] = useState<Version[]>([]); // Lista de versões
    const [currentVersion, setCurrentVersion] = useState<string>(''); // Versão atual
    const navigate = useNavigate(); // Para navegação de rota ao selecionar uma versão

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/texts/content/${contentID}`); // Buscar o conteúdo
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
                const response = await api.get(`/texts/content-versions-list/${contentID}`); // Buscar as versões
                setVersions(response.data);
            } catch (error: any) {
                console.error('Erro ao buscar versões:', error);
            }
        };

        fetchContent();
        fetchVersions();
    }, [contentID]);

    useEffect(() => {
        if (versionID) {
            try {
                api.get(`/texts/content-version/${contentID}/${versionID}`)
                    .then((response) => {
                        setContent(response.data);
                        setCurrentVersion(versionID);
                    })
                    .catch((error) => {
                        console.error('Erro ao buscar versão:', error);
                    });
            } catch (error: any) {
                console.error('Erro ao buscar versão:', error);
                if (error.response) {
                    setError(error.response.data.message || 'Erro ao buscar versão');
                } else {
                    setError('Erro inesperado');
                }
            }
        }
    }, [versionID, contentID]);

    // Função para alterar a versão
    const handleSelectVersion = (versionID: string) => {
        navigate(`/content/${contentID}/${versionID}`); // Altera a rota para incluir o versionID
    };

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
                        onSelectVersion={handleSelectVersion} // Passando a função de seleção de versão
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
            <a href={`/edit/${contentID}/${currentVersion}`} className='my-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold'>
                Editar texto
            </a>
        </div>
    );
};

export default ReadContent;