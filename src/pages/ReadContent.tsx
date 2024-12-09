import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Editor } from '@tinymce/tinymce-react';
import VersionModal from '../components/system/VersionModal';
import CommentComponent from '../components/system/CommentComponent';
import CommentModal from '../components/system/CommentModal';
import WritingPointsBadge from '../components/system/WritingPointsBadge';

interface Version {
    id: string;
    date: string;
}

interface Content {
    title: string;
    content: string;
    username: string;
    isOwner: boolean;
    writingPoints: number;
}

interface Comment {
    contentID: string;
    versionID: string;
    comment: string;
    selectedText: string;
    userName: string;
    editorLevel: number;
}

const ReadContent: React.FC = () => {
    const navigate = useNavigate(); // Para navegação de rota ao selecionar uma versão
    const editorRef = useRef<any>(null);
    const { contentID, versionID } = useParams<{ contentID: string; versionID: string | undefined }>();
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para erros
    const [showVersions, setShowVersions] = useState<boolean>(false);
    const [versions, setVersions] = useState<Version[]>([]); // Lista de versões
    const [currentVersion, setCurrentVersion] = useState<string>(''); // Versão atual
    const [comments, setComments] = useState<Comment[]>([]); // Lista de comentários
    const [selectedText, setSelectedText] = useState<string>(''); // Texto selecionado
    const [selectionInfo, setSelectionInfo] = useState<{ start: number; end: number } | null>(null); // Informações de seleção
    const [showCommentModal, setShowCommentModal] = useState<boolean>(false); // Controle do modal
    const [newComment, setNewComment] = useState<string>(''); // Texto do comentário
    const [role, setRole] = useState<string>('writer'); // Modo atual: writer ou editor

    // Carrega role
    useEffect(() => {
        const storedRole = localStorage.getItem('role') || 'writer';
        setRole(storedRole);
    }, [role]);

    // Pegar comments da API
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/comments/comments/${contentID}/${currentVersion}`);
                setComments(response.data);
            } catch (error: any) {
                console.error('Erro ao buscar comentários:', error);
            }
        };

        fetchComments();
    }, [contentID, currentVersion]);

    const handleSelection = () => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selectedContent = editor.selection.getContent(); // Texto selecionado
            const range = editor.selection.getRng(); // Range da seleção

            if (selectedContent.trim()) {
                setSelectedText(selectedContent);
                setSelectionInfo({
                    start: range.startOffset,
                    end: range.endOffset,
                });
                setShowCommentModal(true); // Exibe o modal
            } else {
                setSelectedText('');
                setSelectionInfo(null);
            }
        }
    };

    const handleAddComment = async () => {
        if (!selectedText || !selectionInfo) return;

        if (!contentID) {
            console.error('Content ID is undefined');
            return;
        }

        const comment: Comment = {
            contentID,
            versionID: currentVersion,
            comment: newComment,
            selectedText,
            userName: localStorage.getItem('username') || 'Anônimo',
            editorLevel: localStorage.getItem('editorLevel') ? parseInt(localStorage.getItem('editorLevel')!) : 0,
        };

        try {
            await api.post('/comments/comment', {
                contentID,
                versionID: currentVersion,
                comment: comment.comment,
                selectedText: comment.selectedText,
            });
            setComments([...comments, comment]); // Adiciona o comentário à lista
            setShowCommentModal(false); // Fecha o modal
            setNewComment(''); // Reseta o input
        } catch (error) {
            console.error('Erro ao salvar comentário:', error);
        }
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/texts/content/${contentID}`); // Buscar o conteúdo
                setContent(response.data);
                setCurrentVersion(response.data.lastVersion);
            } catch (error: any) {
                console.error('Erro ao buscar conteúdo:', error);
                if (error.response) {
                    setError(error.response.data.message || 'Erro inesperado');
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
                        const newContent: Content = {
                            title: content!.title,
                            content: response.data.content,
                            username: content!.username,
                            isOwner: content?.isOwner || false,
                            writingPoints: content?.writingPoints || 0,
                        };


                        setContent(newContent);
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

    if (error) return <div>{error}</div>;
    if (!content) return <div>Carregando...</div>;

    return (document.title = `${content.title} • WrightE`,
        <div className="flex flex-col w-[700px] mx-auto mt-3 relative">
            <div className="flex flex-row justify-between h-[50px]">
                <h1 className="text-xl my-auto">
                    <span className="font-bold">Título: </span>
                    {content.title}
                </h1>
                <div className="relative">
                    <button
                        className="p-2 hover:bg-pink-200 border border-pink-200 my-auto rounded-lg text-sm"
                        onClick={() => setShowVersions(!showVersions)}
                    >
                        {`${currentVersion.slice(0, 3)}...${currentVersion.slice(-3)}`}
                    </button>
                    <VersionModal
                        versions={versions}
                        currentVersion={currentVersion}
                        show={showVersions}
                        onClose={() => setShowVersions(false)}
                        onSelectVersion={(versionID) => navigate(`/content/${contentID}/${versionID}`)}
                    />
                </div>
            </div>
            <hr className="border border-pink-50" />
            <h2 className="text-md mt-2">
                <span className="font-bold">Autor: </span>
                {content.username}
                <WritingPointsBadge writingPoints={content.writingPoints} />
            </h2>
            <div className='mt-5'>
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
                    value={content.content}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    init={{
                        menubar: false,
                        toolbar: false,
                        height: 600,
                    }}
                    disabled={true}
                />
            </div>
            {role === 'writer' && content.isOwner && (
                <a href={`/edit/${contentID}/${currentVersion}`} className='my-2 mx-auto hover:bg-pink-500 bg-pink-200 text-white-100 font-bold py-2 px-4 rounded-lg'>
                    Editar texto
                </a>
            )}
            {role === 'editor' && (
                <button onClick={handleSelection} className='my-2 mx-auto hover:bg-pink-500 bg-pink-200 text-white-100 font-bold py-2 px-4 rounded-lg'>
                    Adicionar comentário
                </button>
            )}
            {comments.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-bold text-xl">Comentários:</h2>
                    {comments.map((comment) => (
                        <div className="p-2 border border-gray-200 rounded mb-2" key={comment.contentID + comment.versionID}>
                            <CommentComponent
                                text={comment.comment}
                                user={comment.userName}
                                selectedText={comment.selectedText}
                                editorLevel={comment.editorLevel}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para Adicionar Comentário */}
            <CommentModal
                isOpen={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                onSave={handleAddComment}
                selectedText={selectedText}
                newComment={newComment}
                setNewComment={setNewComment}
            />
        </div>
    );
};

export default ReadContent;