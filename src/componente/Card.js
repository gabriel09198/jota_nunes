// src/componente/Card.js
import React from 'react';
import Link from 'next/link'; 

const Card = ({ name, link }) => {
  // 1. Divida a string 'name' a cada vez que encontrar '\n'
  const lines = name.split('\n');

  return (
    <Link href={"engenheiro/stepTwo"}>
      <div className="bg-white p-6 h-40 flex flex-col items-center justify-center text-center rounded-xl shadow-md transform transition-transform hover:scale-105 hover:bg-gray-50 cursor-pointer">
        <h3 className="text-lg font-medium text-gray-800">
          {/* 2. Percorra o array de linhas e renderize cada uma */}
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {/* Adicione a quebra de linha, exceto após a última linha */}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
