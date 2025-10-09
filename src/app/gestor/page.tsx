"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus, Upload, User, Settings, Menu } from "lucide-react";

const projetosMock = [
  { id: 1, titulo: "Projeto Casa A", data: "10/09/2025" },
  { id: 2, titulo: "Projeto Casa B", data: "08/09/2025" },
  { id: 3, titulo: "Projeto Casa C", data: "05/09/2025" },
  { id: 4, titulo: "Projeto Apartamento X", data: "02/09/2025" },
];

export default function GestorPage() {
  const [projetos] = useState(projetosMock);
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  const handleNovoDocumento = () => {
    router.push("engenheiro");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-20 bg-red-700 text-white flex-col items-center py-6 space-y-8">
        <button className="hover:bg-red-600 p-3 rounded-xl transition">
          <User />
        </button>
        <button className="hover:bg-red-600 p-3 rounded-xl transition">
          <Settings />
        </button>
      </aside>

      {/* Navbar Mobile */}
      <header className="md:hidden bg-red-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="p-2 rounded-lg hover:bg-red-600 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <div className="md:hidden bg-red-600 text-white flex justify-around py-3">
          <button className="hover:bg-red-500 p-2 rounded-lg transition">
            <User />
          </button>
          <button className="hover:bg-red-500 p-2 rounded-lg transition">
            <Settings />
          </button>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleNovoDocumento}
              className="bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <FilePlus className="w-5 h-5" />
              Novo Documento
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition">
              <Upload className="w-5 h-5" />
              Importar
            </button>
          </div>
        </div>

        {/* Header mobile (botões simplificados) */}
        <div className="flex md:hidden flex-col gap-3 mb-6">
          <button
            onClick={handleNovoDocumento}
            className="bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition"
          >
            <FilePlus className="w-5 h-5" />
            Novo Documento
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition">
            <Upload className="w-5 h-5" />
            Importar
          </button>
        </div>

        {/* Histórico de projetos */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center md:text-left">
          Histórico de Projetos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <div
              key={projeto.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 cursor-pointer"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {projeto.titulo}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Data: {projeto.data}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
