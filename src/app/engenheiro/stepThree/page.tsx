"use client";

import { Controller } from "react-hook-form";
import { useCasaForm, CasaForm } from "@/hooks/validations/useCasaForm";
import Image from "next/image";

// --- Opções ---
const TiposPiso = ["Cerâmica", "Porcelanato", "Madeira"];
const TiposTelhado = ["Colonial", "Fibrocimento", "Laje"];
const TiposJanela = ["Vidro", "Alumínio", "Madeira"];
const TiposPorta = ["Madeira", "Metal", "PVC"];
const Garagem = ["Sim", "Não"];
const Paredes = ["Tijolo", "Drywall"];
const Cozinha = ["Planejada", "Convencional"];
const Banheiro = ["Azulejo", "Porcelanato"];
const Quarto = ["Com suíte", "Sem suíte"];
const Sala = ["Integrada", "Separada"];
const AreaExterna = ["Churrasqueira", "Jardim"];
const Acabamento = ["Simples", "Luxo"];
const Iluminacao = ["Natural", "Artificial"];
const EnergiaSolar = ["Sim", "Não"];
const Piscina = ["Sim", "Não"];
const Resina = ["Sim", "Não"];

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
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg">
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

      <h1 className="text-3xl font-bold text-red-700 mb-10 text-center pt-3">
        Cadastro de Imóvel
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        {[
          { name: "piso", label: "Tipo de Piso *", options: TiposPiso },
          { name: "telhado", label: "Tipo de Telhado *", options: TiposTelhado },
          { name: "janela", label: "Tipo de Janela *", options: TiposJanela },
          { name: "porta", label: "Tipo de Porta *", options: TiposPorta },
          { name: "garagem", label: "Garagem *", options: Garagem },
          { name: "paredes", label: "Tipo de Paredes *", options: Paredes },
          { name: "cozinha", label: "Tipo de Cozinha *", options: Cozinha },
          { name: "banheiro", label: "Banheiro *", options: Banheiro },
          { name: "quarto", label: "Quarto *", options: Quarto },
          { name: "sala", label: "Sala *", options: Sala },
          { name: "areaExterna", label: "Área Externa *", options: AreaExterna },
          { name: "acabamento", label: "Acabamento *", options: Acabamento },
          { name: "iluminacao", label: "Iluminação *", options: Iluminacao },
          { name: "energiaSolar", label: "Energia Solar *", options: EnergiaSolar },
          { name: "piscina", label: "Piscina *", options: Piscina },
          { name: "resina", label: "Resina *", options: Resina },
        ].map(({ name, label, options }) => (
          <div key={name}>
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
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

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition"
          >
            Salvar Imóvel
          </button>
        </div>
      </form>
    </div>
  );
}
