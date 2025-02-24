import React from "react";

interface ColunaTarefasProps {
    titulo: string;
    tarefas: string[];
    onDelete: (index: number) => void;
    onMove?: (index: number) => void; // Opcional, para mover tarefas
    bgColor?: string; // Cor de fundo personalizada
}

const ColunaTarefas: React.FC<ColunaTarefasProps> = ({
    titulo,
    tarefas,
    onDelete,
    onMove,
    bgColor = "bg-gray-200", // Cor padrão
}) => {
    return (
    <div>
        <h3 className="flex justify-center text-3xl pt-7 pb-4">{titulo}</h3>
        <ul>
        {tarefas.map((tarefa, index) => (
            <li
            key={index}
            className={`text-2xl p-2 mb-2 ${bgColor} rounded flex items-center justify-between transition-all duration-500`}
            >
            <span>{tarefa}</span>
            <div>
                {onMove && (
                <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => onMove(index)}
                />
                )}
                <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 transition-all duration-500"
                >
                x
                </button>
            </div>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default ColunaTarefas;