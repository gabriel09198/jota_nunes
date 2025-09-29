"use client";

import { Controller } from "react-hook-form";
import { useCasaForm, CasaForm } from "@/hooks/validations/useCasaForm";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

// --- Opções ---
const TiposPiso = [
  { value: "ceramica", label: "Cerâmica" },
  { value: "porcelanato", label: "Porcelanato" },
  { value: "madeira", label: "Madeira" },
  { value: "laminado", label: "Laminado" },
  { value: "cimento", label: "Cimento queimado" },
];

const TiposTelhado = [
  { value: "ceramica", label: "Telha Cerâmica" },
  { value: "fibrocimento", label: "Fibrocimento" },
  { value: "metalico", label: "Metálico" },
  { value: "vidro", label: "Vidro" },
];

const TiposJanela = [
  { value: "aluminio", label: "Alumínio" },
  { value: "madeira", label: "Madeira" },
  { value: "vidro", label: "Vidro temperado" },
  { value: "pvc", label: "PVC" },
];

const TiposPorta = [
  { value: "madeira", label: "Madeira" },
  { value: "aluminio", label: "Alumínio" },
  { value: "vidro", label: "Vidro" },
  { value: "pvc", label: "PVC" },
];

const Garagem = [
  { value: "nenhuma", label: "Nenhuma" },
  { value: "coberta", label: "Coberta" },
  { value: "descoberta", label: "Descoberta" },
];

const Paredes = [
  { value: "tijolo", label: "Tijolo" },
  { value: "drywall", label: "Drywall" },
  { value: "bloco", label: "Bloco de Concreto" },
  { value: "madeira", label: "Madeira" },
];

const Cozinha = [
  { value: "americana", label: "Americana" },
  { value: "planejada", label: "Planejada" },
  { value: "simples", label: "Simples" },
];

const Banheiro = [
  { value: "luxo", label: "Luxo" },
  { value: "simples", label: "Simples" },
  { value: "azulejado", label: "Azulejado" },
];

const Quarto = [
  { value: "suite", label: "Suíte" },
  { value: "simples", label: "Simples" },
  { value: "duplo", label: "Duplo" },
];

const Sala = [
  { value: "estar", label: "Sala de Estar" },
  { value: "jantar", label: "Sala de Jantar" },
  { value: "tv", label: "Sala de TV" },
];

const AreaExterna = [
  { value: "churrasqueira", label: "Churrasqueira" },
  { value: "jardim", label: "Jardim" },
  { value: "varanda", label: "Varanda" },
  { value: "piscina", label: "Piscina" },
];

const Acabamento = [
  { value: "luxo", label: "Luxo" },
  { value: "medio", label: "Médio" },
  { value: "simples", label: "Simples" },
];

const Iluminacao = [
  { value: "led", label: "LED" },
  { value: "fluorescente", label: "Fluorescente" },
  { value: "incandescente", label: "Incandescente" },
];

const EnergiaSolar = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

const Piscina = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

const Resina = [
  { value: "pura", label: "Pura" },
  { value: "aditiva", label: "Aditiva" },
];

// --- Labels bonitos para o Word ---
const fieldLabels: Record<string, string> = {
  piso: "Tipo de Piso",
  telhado: "Tipo de Telhado",
  janela: "Tipo de Janela",
  porta: "Tipo de Porta",
  garagem: "Garagem",
  paredes: "Tipo de Paredes",
  cozinha: "Tipo de Cozinha",
  banheiro: "Banheiro",
  quarto: "Quarto",
  sala: "Sala",
  areaExterna: "Área Externa",
  acabamento: "Acabamento",
  iluminacao: "Iluminação",
  energiaSolar: "Energia Solar",
  piscina: "Piscina",
  resina: "Resina",
  extras: "Características Extras",
};

// --- Agrupamento de categorias ---
const categorias: Record<string, { value: string; label: string }[]> = {
  piso: TiposPiso,
  telhado: TiposTelhado,
  janela: TiposJanela,
  porta: TiposPorta,
  garagem: Garagem,
  paredes: Paredes,
  cozinha: Cozinha,
  banheiro: Banheiro,
  quarto: Quarto,
  sala: Sala,
  areaExterna: AreaExterna,
  acabamento: Acabamento,
  iluminacao: Iluminacao,
  energiaSolar: EnergiaSolar,
  piscina: Piscina,
  resina: Resina,
};

export default function GestorPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useCasaForm();

  // Categoria escolhida para adicionar opções
  const [selectedCategoria, setSelectedCategoria] = useState<string>("piso");

  // Função que gera o Word
  const gerarWord = async (data: CasaForm) => {
    const rows = Object.entries(data).map(([key, value]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: fieldLabels[key] || key, bold: true }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 60, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph(
                Array.isArray(value)
                  ? value.join(", ")
                  : value
                  ? value
                  : "Não informado"
              ),
            ],
          }),
        ],
      })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Cadastro de Imóvel",
                  bold: true,
                  size: 32,
                }),
              ],
              spacing: { after: 300 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "cadastro-imovel.docx");
  };

  const onSubmit = (data: CasaForm) => {
    console.log("Dados do imóvel:", data);
    gerarWord(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg">
      <div>
        <div className="flex justify-center mb-6">
          <Image
            src="/imagens/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-red-700 mb-10 text-center pt-3">
        Cadastro de Imóvel
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        {Object.entries(categorias).map(([name, options]) => (
          <div key={name}>
            <Controller
              name={name as keyof CasaForm}
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-lg text-gray-800 font-semibold mb-2">
                    {fieldLabels[name] || name} *
                  </label>
                  <select
                    {...field}
                    className="w-full border border-gray-400 rounded-xl p-4 text-lg bg-white text-gray-900 shadow-md focus:ring-4 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Selecione</option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
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
          <label className="block text-lg text-gray-800 font-semibold mb-2">
            Adicionar Item na Categoria Selecionada
          </label>
          <CreatableSelect
            isClearable
            onCreateOption={(inputValue) => {
              const newOption = {
                value: inputValue.toLowerCase().replace(/\s+/g, "_"),
                label: inputValue,
              };
              categorias[selectedCategoria].push(newOption); // adiciona na constante escolhida
            }}
            options={categorias[selectedCategoria]}
            placeholder="Digite e pressione Enter para criar..."
            className="text-gray-900"
          />
        </div>

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
