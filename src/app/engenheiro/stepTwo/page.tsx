"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const errorMessage = "Este campo é obrigatório";
const CasaFormSchema = z.object({
  salaDeEstar: z.enum(["sim", "nao"], { message: errorMessage }),
  cozinha: z.enum(["sim", "nao"], { message: errorMessage }),
  quantidadeQuartos: z.enum(["nenhum","1", "2", "3", "mais"], { message: errorMessage }),
  quantidadeQuartosEspecifica: z.number().optional(),
  suite: z.enum(["sim", "nao"], { message: errorMessage }),
  banheiroSocial: z.enum(["sim", "nao"], { message: errorMessage }),
  garagem: z.enum(["sim", "nao"], { message: errorMessage }),
  areaExterna: z.enum(["sim", "nao"], { message: errorMessage }),
  piscina: z.enum(["sim", "nao"], { message: errorMessage }),
}).superRefine((data, ctx) => {
  if (data.quantidadeQuartos === 'mais') {
    if (data.quantidadeQuartosEspecifica == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Especifique a quantidade.",
        path: ["quantidadeQuartosEspecifica"],
      });
    } else if (data.quantidadeQuartosEspecifica < 4) {
       ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deve ser 4 ou mais.",
        path: ["quantidadeQuartosEspecifica"],
      });
    }
  }
});

type CasaForm = z.infer<typeof CasaFormSchema>;

const opcoesSimNao = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

const ambientes = [
  { name: "salaDeEstar", label: "Sala de Estar" },
  { name: "cozinha", label: "Cozinha" },
  {
    name: "quantidadeQuartos",
    label: "Quantidade de Quartos",
    options: [
      { value: "nenhum", label: "Nenhum" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "mais", label: "Mais de 3" },
    ],
  },
  { name: "suite", label: "Suíte" },
  { name: "banheiroSocial", label: "Banheiro Social" },
  { name: "garagem", label: "Garagem" },
  { name: "areaExterna", label: "Área Externa / Quintal" },
  { name: "piscina", label: "Piscina" },
];

export default function StepTwoPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CasaForm>({
    resolver: zodResolver(CasaFormSchema),
  });

  const quantidadeQuartosValue = watch("quantidadeQuartos");

  useEffect(() => {
    if (quantidadeQuartosValue === 'mais' && !getValues('quantidadeQuartosEspecifica')) {
      setValue('quantidadeQuartosEspecifica', 4, { shouldValidate: true });
    }
  }, [quantidadeQuartosValue, setValue, getValues]);


  const onSubmit = (data: CasaForm) => {
    if (data.quantidadeQuartos !== 'mais') {
      data.quantidadeQuartosEspecifica = undefined; 
    }
    
    console.log("Dados do Formulário:", data);
    
    router.push("../engenheiro/stepThree"); 
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg">
      <div className="flex justify-center mb-6">
        <Image src="/imagens/logo.png" alt="Logo" width={200} height={200} />
      </div>
      <h1 className="text-3xl font-bold text-red-700 mb-10 text-center pt-3">
      Ambientes do Imóvel
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {ambientes.map((ambiente) => (
          <div key={ambiente.name}>
            <Controller
              name={ambiente.name as keyof CasaForm}
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-lg text-gray-800 font-semibold mb-4">
                    {ambiente.label} *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(ambiente.options || opcoesSimNao).map((opt) => (
                      <label key={opt.value} className="flex items-center space-x-3 border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 peer-checked:border-red-500">
                        <input
                          type="radio"
                          {...field}
                          value={opt.value}
                          checked={field.value === opt.value}
                          className="h-5 w-5 text-red-600 border-gray-400 focus:ring-red-500"
                        />
                        <span className="text-gray-900 text-lg font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {ambiente.name === 'quantidadeQuartos' && quantidadeQuartosValue === 'mais' && (
                    <div className="mt-4">
                      <Controller
                        name="quantidadeQuartosEspecifica"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            min="4"
                            placeholder="Qual a quantidade?"
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                            value={isNaN(field.value as number) ? '' : field.value}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                          />
                        )}
                      />
                      {errors.quantidadeQuartosEspecifica && (
                        <p className="text-red-600 text-sm mt-2">
                          {errors.quantidadeQuartosEspecifica.message}
                        </p>
                      )}
                    </div>
                  )}

                  {errors[ambiente.name as keyof CasaForm] && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors[ambiente.name as keyof CasaForm]?.message as string}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}
          <div className="sm:col-span-2">
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition">
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
}