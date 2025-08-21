"use client";

import { useState } from "react";
import { UserCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center "
    style={{backgroundColor: "#BC1F1B",}}
    >
      {/* Card do login */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white bg-opacity-90 p-8 shadow-lg">
        
        {/* Logo da empresa */}
        <div className="mb-6 flex flex-col items-center"> 
          <div className="h-20 w-20 flex items-center justify-center overflow-hidden">
            <Image 
              src="https://d2bxzineatl84k.cloudfront.net/storage/files/logos/db5y8sSHEnJV4CAv3gdQdb6ZlDNZwG895zGJNuJ7.png" 
              alt="Logo Jota Nunes" 
              width={100} 
              height={100} 
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-700">Bem-vindo</h1>
        </div>

        

        {/* Ícone de usuário logado */}
        <div className="flex justify-center gap-5 mb-10">
          <div className="flex flex-col items-center cursor-pointer">
            <UserCircle 
              size={40}
              className= "text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition"
            />
            <span className="mt-2 text-sm text-gray-700">Gestor</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <UserCircle 
              size={60} 
              className= "text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition"
            />
            <span className="mt-2 text-sm text-gray-700">Engenheiro</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <UserCircle 
              size={40} 
              className= "text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition" 
            />
            <span className="mt-2 text-sm text-gray-700">Admin</span>
          </div>
        </div>

        {/* Formulário */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsLogged(true);
          }}
          className="space-y-4 flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Usuário"
            className="w-3/4 rounded-lg border px-3 py-2 text-center text-black focus:border-blue-500 focus:outline-none placeholder:text-black"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-3/4 rounded-lg border px-3 py-2 text-center text-black focus:border-blue-500 focus:outline-none placeholder:text-black"
            required
          />

          <button
            type="submit"
            className="w-3/4 rounded-lg bg-red-600 py-2 text-white font-medium hover:bg-red-700 transition"
          >
            Entrar
          </button>

          {/* Link de criar conta */}
          <p className="text-center text-sm text-gray-600">
            Não tem conta?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Criar conta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}