import React, { useState, useRef, useEffect } from "react";
import ColunaTarefas from "./components/ColunaTarefa";

function App() {
  const [isWrite, setIsWrite] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [selecionaAtividade, setSelecionaAtividade] = useState<number | null>(null);
  const [tarefasPendentes, setTarefasPendentes] = useState<string[]>([]);
  const [tarefasEmProcesso, setTarefasEmProcesso] = useState<string[]>([]);
  const [tarefasFinalizadas, setTarefasFinalizadas] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Mantém o foco no input quando a página carregar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleButtonClick = () => {
    if (!searchInput && inputValue.trim()) {
      if (!tarefasPendentes.includes(inputValue.trim())) {
        setTarefasPendentes([...tarefasPendentes, inputValue.trim()]);
        setInputValue("");
        setIsWrite(false);
        selecionaAtividade
        setSelecionaAtividade(null);
      }
    } else if (searchInput && inputValue.trim()) {
      const taskIndex = tarefasPendentes.findIndex(task => task.toLowerCase() === inputValue.trim().toLowerCase());
      if (taskIndex !== -1) {
        setSelecionaAtividade(taskIndex);
      }
      setInputValue(""); // Limpa o input após a busca
    }

    // 🔹 Mantém o foco no input após qualquer ação
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleDeleteTask = (index: number, lista: string[], setLista: React.Dispatch<React.SetStateAction<string[]>>) => {
    const confirmacao = confirm("Você deseja deletar a tarefa?");
    if (confirmacao) {
      const newTasks = lista.filter((_, i) => i !== index);
      setLista(newTasks);
    }
  };

  const handleMoveTask = (
    index: number,
    listaOrigem: string[],
    setListaOrigem: React.Dispatch<React.SetStateAction<string[]>>,
    listaDestino: string[],
    setListaDestino: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const task = listaOrigem[index];
    const newListaOrigem = listaOrigem.filter((_, i) => i !== index);
    setListaOrigem(newListaOrigem);
    setListaDestino([...listaDestino, task]);
  };

  return (
    <>
      <div>
        <h1 className="text-white font-mono bg-emerald-900 h-15 text-4xl flex py-2.5 justify-center">
          Lista de Tarefa
        </h1>
      </div>
      <div className="flex justify-center mt-5">
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            const eventValue = e.target.value;
            setInputValue(eventValue);
            setIsWrite(eventValue.trim() !== "");
            setSearchInput(tarefasPendentes.some(task => task.toLowerCase() === eventValue.trim().toLowerCase()));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleButtonClick();
            }
          }}
          placeholder="Digite sua tarefa"
          className="min-w-2xs bg-amber-300 rounded-3xl p-2 mx-2 border-2 transition-all duration-500"
        />
        <button
          className={`${isWrite ? "bg-blue-300" : "bg-gray-500"} rounded-full w-10 h-10 border-2 transition-all duration-500`}
          onClick={handleButtonClick}
        >
          <img
            src={
              searchInput
                ? "https://cdn-icons-png.flaticon.com/512/4715/4715177.png"
                : "https://cdn-icons-png.flaticon.com/512/738/738882.png"
            }
            alt=""
            className={`${isWrite ? "" : "grayscale-100"} w-auto p-1.5 transition-all duration-500`}
          />
        </button>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mx-auto p-4">
        {/* Coluna 1: Tarefas Pendentes */}
        <ColunaTarefas
          titulo="Tarefas Pendentes"
          tarefas={tarefasPendentes}
          onDelete={(index) => handleDeleteTask(index, tarefasPendentes, setTarefasPendentes)}
          onMove={(index) =>
            handleMoveTask(index, tarefasPendentes, setTarefasPendentes, tarefasEmProcesso, setTarefasEmProcesso)
          }
          bgColor="bg-gray-200"
        />

        {/* Coluna 2: Tarefas em Processo */}
        <ColunaTarefas
          titulo="Tarefas em Processo"
          tarefas={tarefasEmProcesso}
          onDelete={(index) => handleDeleteTask(index, tarefasEmProcesso, setTarefasEmProcesso)}
          onMove={(index) =>
            handleMoveTask(index, tarefasEmProcesso, setTarefasEmProcesso, tarefasFinalizadas, setTarefasFinalizadas)
          }
          bgColor="bg-yellow-200"
        />

        {/* Coluna 3: Tarefas Finalizadas */}
        <ColunaTarefas
          titulo="Tarefas Finalizadas"
          tarefas={tarefasFinalizadas}
          onDelete={(index) => handleDeleteTask(index, tarefasFinalizadas, setTarefasFinalizadas)}
          bgColor="bg-green-200"
        />
      </div>
    </>
  );
}

export default App;