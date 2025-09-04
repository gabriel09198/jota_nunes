"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation"; // <-- CORRETO

// Importa carrossel dinamicamente (evita SSR)
const SwiperComponent = dynamic(() => import("../../componente/Carrousel"), {
  ssr: false,
});

export default function LoginPage() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter(); // <-- dentro do componente

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogged(true);

    // Se quiser só redirecionar:
    router.push("/gestor");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Container geral */}
      <div className="flex w-[85%] h-screen bg-white shadow-lg overflow-hidden">
        {/* Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 border-4 border-gray-300 rounded-l-2xl">
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
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Bem-vindo!
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Insira suas credenciais para continuar
            </p>

            {/* Formulário */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="w-80 center mx-auto">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-80 border mx-auto block text-left text-black rounded-lg px-4 py-2 focus:border-red-500 focus:outline-none"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div className="w-80 center mx-auto">
                <label className="block text-black mb-1 text-left ">Senha</label>
                <input
                  type="password"
                  className="w-80 border mx-auto block text-black text-left rounded-lg px-2 py-2 focus:border-red-500 focus:outline-none"
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="w-80 mx-auto bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex justify-center items-center gap-2"
              >
                Entrar →
              </button>

              <p className="w-80 text-center mx-auto block text-xs text-gray-500 mt-3">
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
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-700 to-red-900 items-center justify-center border-4 border-gray-300 rounded-r-2xl">
          <SwiperComponent />
        </div>
      </div>
    </div>
  );
}
