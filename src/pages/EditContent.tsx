import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Editor } from '@tinymce/tinymce-react';
import ButtonComponent from '../components/system/ButtonComponent';

const EditContent: React.FC = () => {
    const { contentID, versionID } = useParams<{ contentID: string, versionID: string | undefined }>();
    const [title, setTitle] = useState<string>(''); // Novo estado para o título
    const [content, setContent] = useState<string | null>(null); // Inicialize como null
    const [error, setError] = useState<string | null>(null); // Estado para erros
    const [isOwner, setIsOwner] = useState<boolean>(false); // Estado para verificar se o usuário é o proprietário
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get(`/texts/content-version/${contentID}/${versionID}`); // Buscar o conteúdo
                setTitle(response.data.title);
                setContent(response.data.content);
                setIsOwner(response.data.isOwner);
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
    }, [contentID]);

    const handleEditorChange = (newContent: string) => {
        setContent(newContent || ''); // Atualiza com uma string vazia se o texto for apagado
    };

    const handleSave = async () => {
        try {
            if (contentID) {
                console.log('Salvando conteúdo:', contentID, content);
                await api.post('/texts/content-version', { id: parseInt(contentID, 10), content });
            } else {
                console.error('contentID is undefined');
            }
    
            navigate(`/content/${contentID}`); // Redireciona após salvar
        } catch (error) {
            console.error('Erro ao salvar o conteúdo:', error);
        }
    };

    if (error) return <div>{error}</div>; // Exibe mensagem de erro
    if (content === null) return <div>Carregando...</div>; // Exibe enquanto o conteúdo não for carregado

    if (!isOwner) {
        return <div className='text-xl mx-auto w-[500px] font-bold my-10'>Você não tem permissão para editar este conteúdo.</div>;
    }

    return (document.title = `Editar ${title} • WrightE`,
        <div className='flex flex-col w-[700px] mx-auto mt-3 relative'>
            <div className='flex flex-row justify-between h-[50px] w-full'>
                <h1 className='text-xl my-auto'><span className='font-bold'>Título: </span>{title}</h1>
                <ButtonComponent title='Salvar edição' onClick={handleSave} />
            </div>
            <hr className='border border-green-200 mt-2'/>
            <div className='mt-5'>
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
                    init={{
                        height: 600,
                        menubar: 'file edit view insert format tools',
                        plugins: [
                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                            'insertdatetime media nonbreaking save table template paste textcolor colorpicker',
                            'tinymcespellchecker a11ychecker tinycomments',
                            'emoticons mentions',
                        ],
                        toolbar: [
                            'undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | insertdatetime | code | template | fullscreen',
                            'tinycomments | emoticons | spellcheckdialog a11ycheck',
                        ],
                        content_style: "body { font-family: 'Georgia', serif; font-size: 14px; line-height: 1.5; }",
                        toolbar_location: 'top',
                        resize: true,
                        image_advtab: true,
                    }}
                    value={content} // Usa o valor atualizado do estado
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    );
};

export default EditContent;
