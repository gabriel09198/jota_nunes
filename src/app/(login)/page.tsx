"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { login } from "@/services/auth";

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
      const { access, refresh } = data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      router.push("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Área de Login - 50% */}
      <div className="w-1/2 flex items-center justify-center bg-white shadow-lg border-r border-gray-200 px-6">
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

          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Bem-vindo!
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Insira suas credenciais para continuar
          </p>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Usuário</label>
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
              <label className="block text-gray-700 mb-1">Senha</label>
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
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Entrar →
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
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

      {/* Carrossel - 50% */}
      <div className="w-1/2 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
        <SwiperComponent />
      </div>
    </div>
  );
}
