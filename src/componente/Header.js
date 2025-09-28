// src/componente/Header.js
import React from 'react';

const Header = ({ userName }) => {
  return (
    <header className="flex justify-between items-center bg-red-500 text-white p-4 rounded-md shadow-lg">
      
      <img 
        src="/imagens/logo_branca.png"
        alt="Logo da Empresa" 
        className="h-10 w-auto object-cover" // ajustamos a altura e largura
      />
      {/* ⬅️ ADICIONANDO O NOME AQUI ⬅️ */}
      <h2 className="text-xl font-semibold">Bem-vindo, {userName}!</h2> 
      
    </header>
  );
};

export default Header;