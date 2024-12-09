import React from "react";

interface EditorLevelBadgeProps {
  editorLevel: number;
}

const EditorLevelBadge: React.FC<EditorLevelBadgeProps> = ({ editorLevel }) => {
  // Calcula a intensidade da cor com base no nível (máximo de 10)
  const intensity = Math.min(1, editorLevel / 5); // Limita a intensidade entre 0 e 1

  // Cor do fundo baseada na intensidade (verde)
  const backgroundColor = `rgba(234, 179, 8, ${intensity})`; // Azul com intensidade ajustável

  return (
    <span
      className="py-1 px-2 rounded-lg shadow-md italic text-center text-md mx-2"
      style={{ backgroundColor }}
    >
      {editorLevel}
    </span>
  );
};

export default EditorLevelBadge;