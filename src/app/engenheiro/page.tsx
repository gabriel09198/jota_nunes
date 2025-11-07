"use client";

import Image from "next/image";
import Card from "../../componente/Card";
import React from "react";

interface CardData {
  name: string;
  link: string;
}

const App: React.FC = () => {
  const cardData: CardData[] = [
    { name: "Pérolas do mar", link: "/stepOne" },
    { name: "Por do sol", link: "/stepOne" },
    { name: "Solar das águas", link: "/stepOne" },
    { name: "Alta vista", link: "/stepOne" },
    { name: "Marbello", link: "/stepOne" },
    { name: "Vida bela", link: "/stepOne" },
    { name: "Park Barra", link: "/stepOne" },
    { name: "Rio barra", link: "/stepOne" },
    { name: "Novo Paraíso", link: "/stepOne" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Jotanunes */}
      <header className="bg-red-500 text-white shadow-md rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/imagens/logo_branca.png" // o arquivo deve estar em /public/imagens
            alt="Logo Jotanunes"
            width={120}
            height={32}
            priority // melhora o LCP
            className="h-8 w-auto"
          />
        </div>
        <span className="text-sm font-medium">{""}</span>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8">
        {cardData.map((card, index) => (
          <Card key={index} name={card.name} link={card.link} />
        ))}
      </div>
    </div>
  );
};

export default App;
