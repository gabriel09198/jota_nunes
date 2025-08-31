'use client';

import React, { useState } from 'react';

type Tarefa = {
  id: number;
  nome: string;
};

const Tabelas: React.FC = () => {
  const [criar] = useState<Tarefa[]>([
    { id: 1, nome: 'Criar Projeto' }
  ]);

  const [pendente] = useState<Tarefa[]>([
    { id: 1, nome: 'Aguardar aprovação' },
  ]);

  const [emAnalise, setEmAnalise] = useState<Tarefa[]>([]);

  const [concluido] = useState<Tarefa[]>([
    { id: 1, nome: 'Implementação finalizada' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState('');

  const abrirFormulario = () => {
    setNovaTarefaNome('');
    setMostrarFormulario(true);
  };

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTarefaNome.trim()) return;

    const novaTarefa: Tarefa = {
      id: emAnalise.length + 1,
      nome: novaTarefaNome,
    };

    setEmAnalise([...emAnalise, novaTarefa]);
    setMostrarFormulario(false);
  };

  // Componente BoxTable com opção de altura personalizada
  const BoxTable = ({
    titulo,
    tarefas,
    onAdd,
    className,
  }: {
    titulo: string;
    tarefas: Tarefa[];
    onAdd?: () => void;
    className?: string;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-md p-4 w-[400px] min-h-[400px] ${className}`}
    >
      {titulo && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-left">{titulo}</h2>
          {onAdd && (
            <button
              className="text-red-500 font-bold text-xl hover:text-red-700 transition-colors"
              onClick={onAdd}
            >
              +
            </button>
          )}
        </div>
      )}
      <table className="border-collapse text-left w-full">
        <tbody>
          {tarefas.length > 0 ? (
            tarefas.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.nome}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td className="py-2 text-gray-400 italic">Nenhuma tarefa</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen relative">
      {/* Formulário modal */}
      {mostrarFormulario && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <form
            onSubmit={enviarFormulario}
            className="bg-white p-6 rounded-xl shadow-lg w-[400px]"
          >
            <h3 className="text-lg font-bold mb-4">Nova Tarefa</h3>
            <label className="block mb-2">
              Nome da Tarefa:
              <input
                type="text"
                value={novaTarefaNome}
                onChange={(e) => setNovaTarefaNome(e.target.value)}
                className="border rounded w-full p-2 mt-1"
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela Projetos (altura menor) */}
      <BoxTable
        titulo="Projetos"
        tarefas={criar}
        onAdd={abrirFormulario}
        className="h-[250px]"
      />

      {/* Linha com as outras 3 tabelas */}
      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
        <BoxTable titulo="Pendente" tarefas={pendente} />
        <BoxTable titulo="Em Análise" tarefas={emAnalise} />
        <BoxTable titulo="Concluído" tarefas={concluido} />
      </div>
    </div>
  );
};

export default Tabelas;
