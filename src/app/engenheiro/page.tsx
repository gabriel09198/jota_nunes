// src/App.js
import React from "react";
import Card from "../../componente/Card";

const App = () => {
  const cardData = [
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
          <img
            src="imagens/logo_branca.png" // Caminho da logo
            alt="Logo Jotanunes"
            className="h-8"
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
