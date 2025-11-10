"use client";

import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NovoDocumentoModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* fundo */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* conteúdo */}
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4 z-10">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Novo Projeto
        </h2>

        <button
          onClick={() => {
            onClose();
            router.push("/engenheiro/stepTwo");
          }}
          className="bg-red-700 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition"
        >
          Criar do Zero
        </button>

        <button
          onClick={() => {
            onClose();
            router.push("/engenheiro");
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition"
        >
          Usar Modelo Padrão
        </button>

        <button
          onClick={onClose}
          className="text-gray-500 text-sm hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
