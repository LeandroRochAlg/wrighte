import { Editor } from '@tinymce/tinymce-react';

interface Props {
    isOpen: boolean; // Controla a visibilidade do modal
    onClose: () => void; // Função para fechar o modal
    onSave: (comment: string) => void; // Função para salvar o comentário
    selectedText: string; // Texto selecionado para exibir no modal
    newComment: string; // Texto do comentário
    setNewComment: (value: string) => void; // Função para atualizar o texto do comentário
}

const CommentModal = (props: Props) => {
    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white-100 p-4 rounded shadow-md w-1/2">
                <h2 className="font-bold text-xl mb-4">Adicionar Comentário</h2>
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
                <textarea
                    value={props.newComment}
                    onChange={(e) => props.setNewComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 mt-2"
                    rows={3}
                    placeholder="Escreva seu comentário aqui"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={props.onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => props.onSave(props.newComment)}
                        className="hover:bg-pink-500 bg-pink-200 text-white py-2 px-4 rounded"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;