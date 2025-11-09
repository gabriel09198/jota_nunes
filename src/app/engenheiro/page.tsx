"use client";

import Image from "next/image";
import Card from "../../componente/Card";
import React, { useState } from "react";
import Link from "next/link";

interface CardData {
  name: string;
  link: string;
  description: string;
}

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const cardData: CardData[] = [
    {
      name: "Pérolas do mar",
      link: "/engenheiro/steptwo/FormStepTwo", /* nao estou conseguindo achar a rota para quando clicar no ir para a pag, ele abrir o form do step two*/
      description: "Aqui você encontrará informações sobre os produtos Pérolas do Mar, com detalhes e instruções."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Jotanunes */}
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
        {cardData.map((card, index) => (
          <div key={index} onClick={() => setSelectedCard(card)}>
            <Card name={card.name} />
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedCard && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 text-center relative">
            <h2 className="text-xl font-semibold mb-4">{selectedCard.name}</h2>
            <p className="text-gray-600 mb-6">{selectedCard.description}</p>

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
