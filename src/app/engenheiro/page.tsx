"use client";

import Image from "next/image";
import Card from "../../componente/Card";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/validations/useAuthGuard";
import { getStandardModels } from "@/services/standartModelService";
import { StandardModel } from "@/app/types/standartModels";

interface CardData {
  id: number | string;
  name: string;
  link: string;
  points?: string;
  obs?: string;
}

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [modelName, setModelName] = useState("");
  const [importantPoints, setImportantPoints] = useState("");
  const [observations, setObservations] = useState("");
  const [models, setModels] = useState<CardData[]>([]);
  const [customCards, setCustomCards] = useState<CardData[]>([]);
  const isAuthChecked = useAuthGuard();

  useEffect(() => {
    if (!isAuthChecked) return;

    const fetchData = async () => {
      try {
        const data: StandardModel[] = await getStandardModels();

        const parsed: CardData[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          link: `/engenheiro/stepTwo?model=${item.id}`,
        }));

        setModels(parsed);
      } catch (error) {
        console.error("Erro ao buscar modelos padrão:", error);
      }
    };

    fetchData();
  }, [isAuthChecked]);

  if (!isAuthChecked) {
    return <div className="p-8">Carregando...</div>;
  }

  // monta os 6 cards fixos
  const combinedCards: CardData[] = [
    { id: "new", name: "+", link: "#" },
    ...customCards,
    ...models,
  ];

  while (combinedCards.length < 6) {
    combinedCards.push({ id: `empty-${combinedCards.length}`, name: "", link: "#" });
  }

  const handleSaveCard = () => {
    if (!modelName.trim()) {
      alert("Por favor, insira um nome para o novo modelo.");
      return;
    }

    const newCard: CardData = {
      id: Date.now(),
      name: modelName.trim(),
      link: "/engenheiro/stepTwo?new=true",
      points: importantPoints,
      obs: observations,
    };

    setCustomCards((prev) => [newCard, ...prev]);
    setShowNoteModal(false);
    setModelName("");
    setImportantPoints("");
    setObservations("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative overflow-hidden">
      {/* Header */}
      <header className="bg-red-500 text-white shadow-md rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/imagens/logo_branca.png"
            alt="Logo Jotanunes"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </div>
      </header>



      {/* Cards */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 transition duration-300 ${
          showNoteModal ? "blur-sm brightness-90" : ""
        }`}
      >
        {combinedCards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              if (card.name === "+") {
                setShowNoteModal(true);
              } else if (card.name) {
                setSelectedCard(card);
              }
            }}
            className={card.name ? "cursor-pointer" : "opacity-0 pointer-events-none"}
          >
            <Card
              name={
                card.points || card.obs
                  ? `${card.name}\n\n${card.points ? `🧱 ${card.points}` : ""}${
                      card.obs ? `\n📝 ${card.obs}` : ""
                    }`
                  : card.name || "⠀"
              }
            />
          </div>
        ))}
      </div>

      {/* Modal dos modelos existentes */}
      {selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center relative">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              {selectedCard.name}
            </h2>

            {selectedCard.points && (
              <p className="text-gray-700 mb-2 text-sm whitespace-pre-line">
                🧱 {selectedCard.points}
              </p>
            )}
            {selectedCard.obs && (
              <p className="text-gray-700 mb-6 text-sm whitespace-pre-line">
                📝 {selectedCard.obs}
              </p>
            )}

            <div className="flex justify-center gap-4">
              <Link
                href={selectedCard.link}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Ir para página
              </Link>

              <button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini modal do card “+” */}
      {showNoteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-left relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Novo Modelo
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nome do modelo:
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Digite o nome do modelo"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Pontos importantes:
            </label>
            <textarea
              value={importantPoints}
              onChange={(e) => setImportantPoints(e.target.value)}
              placeholder="Ex: Estrutura, elétrica, hidráulica..."
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-20"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Observações:
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ex: Padrão de cliente, variações de layout..."
              className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-20"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleSaveCard}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
