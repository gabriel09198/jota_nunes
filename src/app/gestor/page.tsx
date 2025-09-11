"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus, Upload, User, Settings } from "lucide-react";

// Dados mockados de projetos
const projetosMock = [
  { id: 1, titulo: "Projeto Casa A", data: "10/09/2025" },
  { id: 2, titulo: "Projeto Casa B", data: "08/09/2025" },
  { id: 3, titulo: "Projeto Casa C", data: "05/09/2025" },
  { id: 4, titulo: "Projeto Apartamento X", data: "02/09/2025" },
];

export default function GestorPage() {
  const [projetos] = useState(projetosMock);
  const router = useRouter();

  const handleNovoDocumento = () => {
    router.push("gestor/cadastro"); // redireciona para a página de criaçao de documento
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-20 bg-red-700 text-white flex flex-col items-center py-6 space-y-8">
        <button className="hover:bg-red-600 p-3 rounded-xl transition">
          <User />
        </button>

        <button className="hover:bg-red-600 p-3 rounded-xl transition">
          <Settings />
        </button>
        
      </aside>

      {/* Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header com botões */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleNovoDocumento}
              className="bg-red-700 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              <FilePlus className="w-5 h-5" />
              Novo Documento
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importar
            </button>
          </div>
        </div>

        {/* Histórico de projetos */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Histórico de Projetos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <div
              key={projeto.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {projeto.titulo}
              </h3>
              <p className="text-gray-600 mt-2">Data: {projeto.data}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
