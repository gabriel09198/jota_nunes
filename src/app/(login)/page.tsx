"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import api from "@/services/api";
import { login } from "@/services/auth";

// Importa carrossel dinamicamente (evita SSR)
const SwiperComponent = dynamic(() => import("../../componente/Carrousel"), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(username, password);
      console.log("Tokens:", data);

      const { access } = data;

      localStorage.setItem("access_token", access);

      router.push("/gestor");
    } catch (err: any) {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full lg:w-[85%] h-auto lg:h-screen bg-white shadow-lg overflow-hidden rounded-2xl">
        {/* Área de Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 sm:py-12 border-b-4 lg:border-b-0 lg:border-r-4 border-gray-200">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/imagens/logo.png"
                alt="Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
              Bem-vindo!
            </h1>
            <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
              Insira suas credenciais para continuar
            </p>

            {/* Formulário */}
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                  Usuário
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:border-red-500 focus:outline-none"
                  placeholder="Digite seu usuário"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                  Senha
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:border-red-500 focus:outline-none"
                  placeholder="Digite sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg hover:bg-red-700 transition text-sm sm:text-base font-medium"
              >
                Entrar →
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                Ao continuar, você concorda com os{" "}
                <a href="#" className="text-red-600 hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-red-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Carrossel */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-700 to-red-900 items-center justify-center border-l-4 border-gray-200">
          <SwiperComponent />
        </div>
      </div>
    </div>
  );
}
