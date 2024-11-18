import { Editor } from '@tinymce/tinymce-react';

interface Props {
    text: string;
    user: string;
    selectedText: string;
}

const CommentComponent = (props: Props) => {
    return (
        <div className="p-4 bg-white-50 rounded shadow-md">
            <p className="mb-2 text-lg">
            {props.text}
            </p>
            <p className="mb-4 text-sm text-gray-600">
            <strong>Usuário:</strong> {props.user}
            </p>
            <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY as string}
            value={props.selectedText}
            init={{
                menubar: false,
                toolbar: false,
                height: 200,
            }}
            disabled={true}
            />
        </div>
    );
}

export default CommentComponent;