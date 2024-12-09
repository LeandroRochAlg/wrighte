import React from "react";

interface WritingPointsCardProps {
  writingPoints: number;
}

const WritingPointsBadge: React.FC<WritingPointsCardProps> = ({ writingPoints }) => {
  // Calcula a intensidade da cor com base nos pontos (máximo de 500)
  const intensity = Math.min(1, writingPoints / 500); // Limita a intensidade entre 0 e 1

  // Calcula a cor baseada na intensidade (quanto mais pontos, mais forte o azul)
  const backgroundColor = `rgba(153, 184, 60, ${intensity})`; // Azul com intensidade ajustável

  return (
    <span
      className="py-1 px-2 rounded-lg shadow-md italic text-center text-md mx-2"
      style={{ backgroundColor, color: intensity > 0.5 ? 'white' : 'black' }}
    >
      {writingPoints}
    </span>
  );
};

export default WritingPointsBadge;