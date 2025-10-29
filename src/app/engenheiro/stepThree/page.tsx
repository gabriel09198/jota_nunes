"use client";

import { Controller } from "react-hook-form";
import { useCasaForm, CasaForm } from "@/hooks/validations/useCasaForm";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Opções ---
const campos = [
  { name: "piso", label: "Tipo de Piso *", options: ["Cerâmica", "Porcelanato", "Madeira"] },
  { name: "telhado", label: "Tipo de Telhado *", options: ["Colonial", "Fibrocimento", "Laje"] },
  { name: "janela", label: "Tipo de Janela *", options: ["Vidro", "Alumínio", "Madeira"] },
  { name: "porta", label: "Tipo de Porta *", options: ["Madeira", "Metal", "PVC"] },
  { name: "garagem", label: "Garagem *", options: ["Sim", "Não"] },
  { name: "paredes", label: "Tipo de Paredes *", options: ["Tijolo", "Drywall"] },
  { name: "cozinha", label: "Tipo de Cozinha *", options: ["Planejada", "Convencional"] },
  { name: "banheiro", label: "Banheiro *", options: ["Azulejo", "Porcelanato"] },
  { name: "quarto", label: "Quarto *", options: ["Com suíte", "Sem suíte"] },
  { name: "sala", label: "Sala *", options: ["Integrada", "Separada"] },
  { name: "areaExterna", label: "Área Externa *", options: ["Churrasqueira", "Jardim"] },
  { name: "acabamento", label: "Acabamento *", options: ["Simples", "Luxo"] },
  { name: "iluminacao", label: "Iluminação *", options: ["Natural", "Artificial"] },
  { name: "energiaSolar", label: "Energia Solar *", options: ["Sim", "Não"] },
  { name: "piscina", label: "Piscina *", options: ["Sim", "Não"] },
  { name: "resina", label: "Resina *", options: ["Sim", "Não"] },
];

export default function GestorPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useCasaForm();

  const onSubmit = (data: CasaForm) => {
    console.log("Dados do imóvel:", data);
    alert("Dados do imóvel salvos com sucesso (simulação).");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/imagens/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-extrabold text-center text-red-700 mb-10 tracking-tight">
          Cadastro de Imóvel
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {campos.map(({ name, label, options }) => (
            <div
              key={name}
              className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Controller
                name={name as keyof CasaForm}
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-lg text-gray-800 font-semibold mb-2">
                      {label}
                    </label>
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    >
                      <option value="">Selecione uma opção</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {errors[name as keyof CasaForm] && (
                      <p className="text-red-600 text-sm mt-2">
                        {errors[name as keyof CasaForm]?.message as string}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          ))}

          {/* Botão */}
          <div className="sm:col-span-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200"
            >
              Salvar Imóvel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
