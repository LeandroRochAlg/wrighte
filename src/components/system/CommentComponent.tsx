import { Editor } from '@tinymce/tinymce-react';
import EditorLevelBadge from './EditorLevelBadge';

interface Props {
    text: string;
    user: string;
    selectedText: string;
    editorLevel: number;
}

const CommentComponent: React.FC<Props> = ({ text, user, selectedText, editorLevel }) => {
    return (
        <div className="p-4 bg-white-50 rounded shadow-md">
            {/* Texto do comentário */}
            <p className="mb-2 text-lg">
                {text}
            </p>

            {/* Usuário e nível */}
            <div className="mb-4 text-sm text-gray-600 flex items-center space-x-2">
                <strong>Usuário:</strong>
                <span>{user}</span>
                <EditorLevelBadge editorLevel={editorLevel} />
            </div>

            {/* Texto selecionado */}
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
                value={selectedText}
                init={{
                    menubar: false,
                    toolbar: false,
                    height: 200,
                }}
                disabled={true}
            />
        </div>
    );
};

export default CommentComponent;