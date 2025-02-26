import React, { useState } from "react";

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
    bgColor = "md:bg-blue-600 bg-gray-200", // Cor padrão
}) => {
  // Usando useState para definir o estado de altura
  const [height, setHeight] = useState<string>('flex'); // Valor inicial

return (
    <div>
    <h3
        onClick={() => {
          // Alterna a classe de altura
        setHeight(height === 'flex' ? 'hidden' : 'flex');
        }}
        className={`flex justify-center text-2xl pt-7 pb-4 cursor-default`}
    >
        {titulo}
        {<img className={`lg:hidden h-7.5 pl-2 rotate-${height === "flex" ? "180" : "90"} transform transition-transform ease-in`} src="https://cdn-icons-png.flaticon.com/512/16026/16026407.png"></img>}
    </h3>
    <ul>
        {tarefas.map((tarefa, index) => (
        <li
            key={index}
            className={`${height} text-2xl p-2 mb-2 ${bgColor} rounded lg:flex items-center justify-between transition-all duration-500`}
        >
            <span>{tarefa}</span>
            <div>
            {onMove && (
                <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                onChange={() => onMove(index)}
                />
            )}
            <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 transition-all duration-500 cursor-pointer"
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
