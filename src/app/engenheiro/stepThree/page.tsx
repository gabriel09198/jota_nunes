"use client";

import { Controller } from "react-hook-form";
import { useCasaForm, CasaForm } from "@/hooks/validations/useCasaForm";
import Image from "next/image";
import { motion } from "framer-motion";

// ==================== CAMPOS ====================
const unidadesPrivativas = [
  {
    titulo: "1.2 Sala de Estar / Jantar",
    campos: [
      { name: "piso_sala", label: "Piso", options: ["Porcelanato", "Laminado"] },
      { name: "parede_sala", label: "Parede", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA"] },
      { name: "teto_sala", label: "Teto", options: ["Pintura PVA látex branco sobre gesso ou massa de regularização PVA"] },
      { name: "rodape_sala", label: "Rodapé", options: ["Porcelanato", "Laminado (h=5cm)"] },
      { name: "soleira_sala", label: "Soleira", options: ["Mármore", "Granito"] },
      { name: "peitoril_sala", label: "Peitoril", options: ["Metálico"] },
      { name: "esquadria_sala", label: "Esquadria", options: ["Alumínio pintado de branco"] },
      { name: "vidro_sala", label: "Vidro", options: ["Liso incolor"] },
      { name: "porta_sala", label: "Porta", options: ["Semi–ôca comum pintada com esmalte sintético"] },
      { name: "ferragem_sala", label: "Ferragem", options: ["Acabamento cromado"] },
      { name: "instalacaoEletrica_sala", label: "Instalação Elétrica", options: ["Pontos de luz no teto, tomadas e interruptores"] },
      { name: "instalacaoComunic_sala", label: "Instalação de Comunicação", options: ["Pontos secos de comunicação e antena de TV"] },
    ],
  },
];

export default function CadastroImovel() {
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
        <h1 className="text-4xl font-extrabold text-center text-red-700 mb-4 tracking-tight">
          Cadastro de Imóvel
        </h1>

        {/* Seção principal */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-2">
          🏠 UNIDADES PRIVATIVAS
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {unidadesPrivativas.map((secao) => (
            <div key={secao.titulo}>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {secao.titulo}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {secao.campos.map(({ name, label, options }) => (
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
              </div>
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
