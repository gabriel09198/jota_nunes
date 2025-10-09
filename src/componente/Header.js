// src/componente/Header.js
import React from "react";
import Image from "next/image";

/**
 * @param {{ userName?: string }} props
 */
export default function Header({ userName = "" }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={120} height={60} priority />
        {userName && (
          <span className="text-gray-700 text-sm">Olá, {userName}</span>
        )}
      </div>
    </header>
  );
}
