"use client";

import { useState } from "react";
import { UserCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        
        {/* Logo da empresa */}
        <div className="mb-6 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <Image 
              src="https://d2bxzineatl84k.cloudfront.net/storage/files/logos/db5y8sSHEnJV4CAv3gdQdb6ZlDNZwG895zGJNuJ7.png" 
              alt="Logo Jota Nunes" 
              width={100} 
              height={100} 
              className="object-contain"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-700">Bem-vindo</h1>
        </div>

        {/* Ícone de usuário logado */}
        <div className="flex justify-center mb-4">
          <UserCircle size={60} className={isLogged ? "text-green-500" : "text-gray-400"} />
        </div>

        {/* Formulário */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsLogged(true);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Usuário"
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
