import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import ButtonComponent from '../components/system/ButtonComponent';

const EditorPage: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState(''); // Novo estado para o título
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'writer') {
            navigate('/login');
        }
    }, [navigate]);

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSave = async () => {
        try {
            await api.post('/texts/book-content', { title, content });

            console.log(title);
    
            navigate('/'); // Redireciona após salvar
        } catch (error) {
            console.error('Erro ao salvar o conteúdo:', error);
        }
    };
    return (document.title = "Criar texto  • WrightE",
        <div className='flex flex-col w-[700px] mx-auto mt-3'>
            <div className='flex flex-row mb-3 h-10 gap-2'>
                <input 
                    type="text" 
                    placeholder="Digite o título do livro" 
                    value={title} 
                    onChange={handleTitleChange} 
                    className="w-full mb-2 px-2 h-10 border border-green-200 rounded-md"
                />
                <ButtonComponent title="Salvar texto" onClick={handleSave} />
            </div>
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
                initialValue="Comece aqui..."
                onEditorChange={handleEditorChange}
            />
        </div>
    );
};

export default EditorPage;