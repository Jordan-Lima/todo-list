import { useState, useRef, useEffect } from "react";

function App() {
  const [isWrite, setIsWrite] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [selecionaAtividade, setSelecionaAtividade] = useState<number | null>(null);
  const [arrTarefas, setArrTarefas] = useState<string[]>([""]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Mantém o foco no input quando a página carregar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleButtonClick = () => {
    if (!searchInput && inputValue.trim()) {
      setArrTarefas([...arrTarefas, inputValue.trim()]);
      setInputValue("");
      setIsWrite(false);
      setSelecionaAtividade(null);
    } else if (searchInput && inputValue.trim()) {
      const taskIndex = arrTarefas.findIndex(task => task.toLowerCase() === inputValue.trim().toLowerCase());
      if (taskIndex !== -1) {
        setSelecionaAtividade(taskIndex);
      }
    }

    // 🔹 Mantém o foco no input após qualquer ação
    setTimeout(() => inputRef.current?.focus(), 0);
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
          ref={inputRef} // 🔹 Mantém a referência ao input
          value={inputValue}
          onChange={(e) => {
            const eventValue = e.target.value;
            setInputValue(eventValue);
            setIsWrite(eventValue.trim() !== "");

            setSearchInput(arrTarefas.some(task => task.toLowerCase() === eventValue.trim().toLowerCase()));
          }}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              handleButtonClick()
            }
          }}
          placeholder="Digite sua tarefa"
          className="min-w-2xs bg-amber-300 rounded-3xl p-2 mx-2 border-2"
        />
        <button
          className={`${isWrite ? "bg-blue-300" : "bg-gray-500"} rounded-full w-10 h-10 border-2`}
          onClick={handleButtonClick} 
        >
          <img
            src={
              searchInput
                ? "https://cdn-icons-png.flaticon.com/512/4715/4715177.png"
                : "https://cdn-icons-png.flaticon.com/512/738/738882.png"
            }
            alt=""
            className={`${isWrite ? "" : "grayscale-100"} w-auto p-1.5`}
          />
        </button>
      </div>
      <div 
        className="flex-col">
        <h2 
          className="text-3xl p-7 flex justify-center">Minhas Tarefas:</h2>
        <ul>
          {arrTarefas.map((tarefa, index) => (
            <li
              key={index}
              className={`${
                selecionaAtividade === index ? "text-gray-700 border-2 bg-emerald-500" : ""
              } text-2xl pl-7`}
            >
              {tarefa !== "" ? `${index} - ${tarefa}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

