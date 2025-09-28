// src/App.js
import React from 'react';
import Header from '../../componente/Header';
import Card from '../../componente/Card';

const App = () => {
  const cardData = [
    { name: 'Pérolas do mar\nTorre PC - Mais Viver', link: '/pessoa1' },
    { name: 'Por do sol\nTorre PC - Mais Viver', link: '/pessoa2' },
    { name: 'Solar das águas\nTorre PC - Mais Viver', link: '/pessoa3' },
    { name: 'Alta vista\nTorre PC - mais viver', link: '/pessoa4' },
    { name: 'Marbello\nTorre PC - Residence', link: '/pessoa5' },
    { name: 'Vida bela\nTorre PC - Residence', link: '/pessoa6' },
    { name: 'Park Barra\nSobrado PC - Mais Viver', link: '/pessoa7' },
    { name: 'Rio barra\nSobrado PC - Mais Viver', link: '/pessoa8' },
    { name: 'Novo Paraiso\nSobrado PC - Mais Viver', link: '/pessoa9' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header userName="Kauã" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {cardData.map((card, index) => (
          <Card key={index} name={card.name} link={card.link} />
        ))}
      </div>
    </div>
  );
};

export default App;