"use client";

import Image from "next/image";
import Card from "../../componente/Card";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/validations/useAuthGuard";
import { getStandardModels } from "@/services/standartModelService";
import { StandardModel } from "@/app/types/standartModels";

interface CardData {
  id: number;
  name: string;
  link: string;
}

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [models, setModels] = useState<CardData[]>([]);
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
        console.error("Erro ao buscar modelos padrao:", error);
      }
    };

    fetchData();
  }, [isAuthChecked]);

  // evita retorno antes dos hooks → agora apenas renderiza algo
  if (!isAuthChecked) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8">
        {models.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="cursor-pointer"
          >
            <Card name={card.name} />
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedCard && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center relative">
            <h2 className="text-xl font-semibold mb-6">{selectedCard.name}</h2>

            <div className="flex justify-center gap-4">
              <Link
                href={selectedCard.link}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Ir para página
              </Link>

              <button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
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

export default App;
