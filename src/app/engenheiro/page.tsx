// src/App.js
import React from 'react';
import Header from '../../componente/Header';
import Card from '../../componente/Card';

const App = () => {
  const cardData = [
  { name: 'Pérolas do mar', link: '/stepOne' },
  { name: 'Por do sol', link: '/stepOne' },
  { name: 'Solar das águas', link: '/stepOne' },
  { name: 'Alta vista', link: '/stepOne' },
  { name: 'Marbello', link: '/stepOne' },
  { name: 'Vida bela', link: '/stepOne' },
  { name: 'Park Barra', link: '/stepOne' },
  { name: 'Rio barra', link: '/stepOne' },
  { name: 'Novo Paraíso', link: '/stepOne' },
];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header userName="" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {cardData.map((card, index) => (
          <Card key={index} name={card.name} link={card.link} />
        ))}
      </div>
    </div>
  );
};

export default App;