"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { useAuthGuard } from "@/hooks/validations/useAuthGuard";
import { getStandardModels } from "@/services/standartModelService";
import { StandardModel } from "@/app/types/standartModels";

const ModeloPadrao: React.FC = () => {
  const [models, setModels] = useState<StandardModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState<StandardModel | null>(null);
  const isAuthChecked = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthChecked) return;

    const fetchData = async () => {
      try {
        const data = await getStandardModels();
        setModels(data);
      } catch (error) {
        console.error("Erro ao buscar modelos padrão:", error);
      }
    };

    fetchData();
  }, [isAuthChecked]);

  if (!isAuthChecked)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Carregando...
      </div>
    );

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="flex items-center gap-3 bg-red-700 text-white px-4 py-3 shadow-md">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-red-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg">Modelos Padrão</h1>
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col items-center justify-start flex-1 p-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Selecione um modelo existente
        </h2>

        {/* Barra de busca + botão */}
        <div className="flex flex-row items-center justify-center gap-4 w-full max-w-6xl mb-10">
          <input
            type="text"
            placeholder="Buscar modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[750px] p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
          />

          <button
            onClick={() => router.push("/engenheiro/stepTwo?new=true")}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
          >
            Criar modelo do zero
          </button>
        </div>

        {/* Cards */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center w-full max-w-5xl">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="bg-white w-full p-5 rounded-xl border border-gray-200 shadow hover:shadow-lg transition cursor-pointer relative group"
              >
                {/* Ícone de info */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModel(model);
                  }}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
                >
                  <Info className="w-5 h-5" />
                </button>

                {/* Conteúdo do card */}
                <div
                  onClick={() =>
                    router.push(`/engenheiro/stepTwo?model=${model.id}`)
                  }
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Observações: {model.observations?.length || 0}
                  </p>
                  <span className="text-xs text-gray-500">
                    Última edição: {model.lastEdited ?? "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Nenhum modelo encontrado.</p>
        )}
      </main>

      {/* Modal de informações */}
      {selectedModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {selectedModel.name}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Observações:</strong>{" "}
              {selectedModel.observations || "Nenhuma observação registrada."}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Última edição:</strong>{" "}
              {selectedModel.lastEdited ?? "—"}
            </p>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedModel(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeloPadrao;
