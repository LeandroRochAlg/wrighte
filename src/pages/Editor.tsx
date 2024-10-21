import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';



const EditorPage: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState(''); // Novo estado para o título
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
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
            // Enviar os dados para o backend
            await fetch('http://localhost:3000/users/book-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }), // Passar o título e o conteúdo
            });

            // Redirecionar para a página inicial
            navigate('/');
        } catch (error) {
            console.error('Erro ao salvar o conteúdo:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Digite o título do livro" 
                value={title} 
                onChange={handleTitleChange} 
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <Editor
                apiKey="k71i2888lt5v5mghmdih494kwh7noig1ntvsta0lm9pt1dpc"
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
                    image_advtab: true
                }}
                initialValue="Comece aqui..."
                onEditorChange={handleEditorChange}
            />
            <button onClick={handleSave}>Salvar</button>
        </div>
    );
};

export default EditorPage;