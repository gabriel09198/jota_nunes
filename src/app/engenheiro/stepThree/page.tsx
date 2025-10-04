//"use client";
//
//import { Controller } from "react-hook-form";
//import { useCasaForm, CasaForm } from "@/hooks/validations/useCasaForm";
//import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType } from "docx";
//import { saveAs } from "file-saver";
//import Image from "next/image";
//
// --- Opções --- (Sem alterações, omitido para encurtar)
//const TiposPiso = [/* ... */];
//const TiposTelhado = [/* ... */];
// ... (restante das opções)
//
// --- Labels para o Word --- (Sem alterações)
//const fieldLabels: Record<string, string> = { /* ... */ };
//
//
//export default function GestorPage() {
//  const {
//    control,
//    handleSubmit,
//    formState: { errors },
//  } = useCasaForm();
//
//  // Função que gera o Word
//  const gerarWord = async (data: CasaForm) => {
//    const rows = Object.entries(data).map(([key, value]) => {
//      
//      // MODIFICADO: Lógica para tratar o valor antes de criar o parágrafo
//      // 1. Verifica se o 'value' é uma lista (array).
//      // 2. Se for, transforma a lista num texto único separado por vírgulas (ex: "Jardim, Piscina").
//      // 3. Se não for uma lista, usa o valor como está.
//      // 4. Se o valor estiver vazio, usa "Não informado".
//      const textoParaExibir = Array.isArray(value)
//        ? value.join(", ")
//        : value
//        ? String(value)
//        : "Não informado";
//
//      return new TableRow({
//        children: [
//          new TableCell({
//            width: { size: 40, type: WidthType.PERCENTAGE },
//            children: [new Paragraph({ children: [new TextRun({ text: fieldLabels[key] || key, bold: true })] })],
//          }),
//          new TableCell({
//            width: { size: 60, type: WidthType.PERCENTAGE },
//            // CORRIGIDO: Usa a variável 'textoParaExibir' que é garantidamente um texto.
//            children: [new Paragraph(textoParaExibir)],
//          }),
//        ],
//      });
//    });
//
//    const doc = new Document({
//      sections: [
//        {
//          children: [
//            new Paragraph({
//              children: [new TextRun({ text: "Cadastro de Imóvel", bold: true, size: 32 })],
//              spacing: { after: 300 },
//            }),
//            new Table({
//              width: { size: 100, type: WidthType.PERCENTAGE },
//              rows,
//            }),
//          ],
//        },
//      ],
//    });
//
//    const blob = await Packer.toBlob(doc);
//    saveAs(blob, "cadastro-imovel.docx");
//  };
//
//  const onSubmit = (data: CasaForm) => {
//    console.log("Dados do imóvel:", data);
//    gerarWord(data);
//  };
//
//  return (
//    <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg">
//
//      <div>
//        <div className="flex justify-center mb-6">
//          <Image
//            src="/imagens/logo.png"
//            alt="Logo"
//            width={200}
//            height={200}
//            className="object-contain"
//          />
//        </div>
//      </div>
//      <h1 className="text-3xl font-bold text-red-700 mb-10 text-center pt-3">
//        Cadastro de Imóvel
//      </h1>
//
//      <form
//        onSubmit={handleSubmit(onSubmit)}
//        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
//      >
//        {[
//          { name: "piso", label: "Tipo de Piso *", options: TiposPiso },
//          { name: "telhado", label: "Tipo de Telhado *", options: TiposTelhado },
//          { name: "janela", label: "Tipo de Janela *", options: TiposJanela },
//          { name: "porta", label: "Tipo de Porta *", options: TiposPorta },
//          { name: "garagem", label: "Garagem *", options: Garagem },
//          { name: "paredes", label: "Tipo de Paredes *", options: Paredes },
//          { name: "cozinha", label: "Tipo de Cozinha *", options: Cozinha },
//          { name: "banheiro", label: "Banheiro *", options: Banheiro },
//          { name: "quarto", label: "Quarto *", options: Quarto },
//          { name: "sala", label: "Sala *", options: Sala },
//          { name: "areaExterna", label: "Área Externa *", options: AreaExterna },
//          { name: "acabamento", label: "Acabamento *", options: Acabamento },
//          { name: "iluminacao", label: "Iluminação *", options: Iluminacao },
//          { name: "energiaSolar", label: "Energia Solar *", options: EnergiaSolar },
//          { name: "piscina", label: "Piscina *", options: Piscina },
//          { name: "resina", label: "Resina *", options: Resina },
//        ].map(({ name, label, options }) => (
//          <div key={name}>
//            <Controller
//              name={name as keyof CasaForm}
//              control={control}
//              render={({ field }) => (
//                <div>
//                  <label className="block text-lg text-gray-800 font-semibold mb-2">
//                    {label}
//                  </label>
//                  <select
//                    {...field}
//                    className="w-full border border-gray-400 rounded-xl p-4 text-lg bg-white text-gray-900 shadow-md focus:ring-4 focus:ring-red-500 focus:border-red-500"
//                  >
//                    <option value="">Selecione</option>
//                    {options.map((opt) => (
//                      <option key={opt.value} value={opt.label}>
//                        {opt.label}
//                      </option>
//                    ))}
//                  </select>
//                  {errors[name as keyof CasaForm] && (
//                    <p className="text-red-600 text-sm mt-2">
//                      {errors[name as keyof CasaForm]?.message as string}
//                    </p>
//                  )}
//                </div>
//              )}
//            />
//          </div>
//        ))}
//
//        <div className="sm:col-span-2">
//          <button
//            type="submit"
//            className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition"
//          >
//            Salvar Imóvel
//          </button>
//        </div>
//      </form>
//    </div>
//
//  );
//}