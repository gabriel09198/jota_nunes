"use client";

import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const errorMessage = "Este campo é obrigatório";

// Validação com Zod
const CasaFormSchema = z
  .object({
    salaDeEstar: z.boolean(),
    cozinha: z.boolean(),
    quantidadeQuartos: z.enum(["nenhum", "1", "2", "3", "mais"], { message: errorMessage }),
    quantidadeQuartosEspecifica: z.number().optional(),
    suite: z.boolean(),
    banheiroSocial: z.boolean(),
    garagem: z.boolean(),
    areaExterna: z.boolean(),
    piscina: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.quantidadeQuartos === "mais" &&
      (data.quantidadeQuartosEspecifica == null || data.quantidadeQuartosEspecifica < 4)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deve ser 4 ou mais.",
        path: ["quantidadeQuartosEspecifica"],
      });
    }
  });

type CasaForm = z.infer<typeof CasaFormSchema>;

// Tipos para ambientes
type AmbienteBase = {
  name: keyof CasaForm;
  label: string;
};

type AmbienteComOptions = AmbienteBase & {
  options: { value: string; label: string }[];
};

type Ambiente = AmbienteBase | AmbienteComOptions;

// Lista de ambientes
const ambientes: Ambiente[] = [
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

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

interface FormFieldProps {
  ambiente: Ambiente;
  control: Control<CasaForm>;
  errors: FieldErrors<CasaForm>;
  quantidadeQuartosValue: string | undefined;
}

const FormField = ({ ambiente, control, errors, quantidadeQuartosValue }: FormFieldProps) => (
  <Controller
    name={ambiente.name as keyof CasaForm}
    control={control}
    render={({ field }) => (
      <div className="h-fit">
        {"options" in ambiente ? (
          <div>
            <label className="block text-lg text-gray-700 font-semibold mb-2">
              {ambiente.label} <span className="text-red-500">*</span>
            </label>
            <select
              {...field}
              value={String(field.value ?? "")}
              className="w-full border border-gray-300 rounded-xl p-4 text-lg bg-white text-gray-800 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {ambiente.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <label className="flex items-center justify-between border rounded-xl p-4 transition-all duration-200 cursor-pointer has-[:checked]:bg-red-50 has-[:checked]:border-red-600 h-full">
            <span className="text-lg text-gray-700 font-semibold has-[:checked]:text-red-800">
              {ambiente.label}
            </span>
            <div className="relative h-6 w-6">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
              <div className="w-6 h-6 rounded border-2 border-gray-300 transition-all duration-200 peer-checked:bg-red-600 peer-checked:border-red-600 flex items-center justify-center">
                <div className="hidden peer-checked:block">
                  <CheckIcon />
                </div>
              </div>
            </div>
          </label>
        )}

        {ambiente.name === "quantidadeQuartos" && quantidadeQuartosValue === "mais" && (
          <div className="mt-4">
            <Controller
              name="quantidadeQuartosEspecifica"
              control={control}
              render={({ field: specificField }) => (
                <input
                  type="number"
                  min={4}
                  placeholder="Qual a quantidade?"
                  {...specificField}
                  // ✅ CORRIGIDO: Evita `NaN` quando o campo está vazio.
                  onChange={(e) => {
                    const value = e.target.value;
                    specificField.onChange(value === "" ? undefined : parseInt(value, 10));
                  }}
                  value={specificField.value ?? ""}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              )}
            />
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
);

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
    defaultValues: {
      salaDeEstar: false,
      cozinha: false,
      suite: false,
      banheiroSocial: false,
      garagem: false,
      areaExterna: false,
      piscina: false,
      quantidadeQuartos: "" as CasaForm["quantidadeQuartos"],
    },
  });

  const quantidadeQuartosValue = watch("quantidadeQuartos");

  // ✅ MELHORADO: Limpa o campo específico se outra opção for selecionada.
  useEffect(() => {
    if (quantidadeQuartosValue === "mais") {
      if (!getValues("quantidadeQuartosEspecifica")) {
        setValue("quantidadeQuartosEspecifica", 4, { shouldValidate: true });
      }
    } else {
      if (getValues("quantidadeQuartosEspecifica") !== undefined) {
        setValue("quantidadeQuartosEspecifica", undefined, { shouldValidate: true });
      }
    }
  }, [quantidadeQuartosValue, setValue, getValues]);

  const onSubmit = (data: CasaForm) => {
    // Limpa o valor específico se "mais" não estiver selecionado (redundância segura)
    if (data.quantidadeQuartos !== "mais") {
      data.quantidadeQuartosEspecifica = undefined;
    }
    console.log("Dados do Formulário:", data);
    router.push("/engenheiro/stepThree");
  };

  const half = Math.ceil(ambientes.length / 2);
  const leftColumnItems = ambientes.slice(0, half);
  const rightColumnItems = ambientes.slice(half);

  return (
    <div className="bg-gradient-to-b from-white-0 to-red-0 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
          <Image
            src="/imagens/logo_branca.png"
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-red-700">Passo 2 de 3</span>
              <span className="text-sm font-medium text-red-700">50%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full w-[50%]" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Ambientes do Imóvel</h1>
            <p className="text-gray-500 mt-2">Selecione os ambientes que o imóvel possui.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
              <div className="flex-1 space-y-6">
                {leftColumnItems.map((ambiente) => (
                  <FormField
                    key={ambiente.name}
                    ambiente={ambiente}
                    control={control}
                    errors={errors}
                    quantidadeQuartosValue={quantidadeQuartosValue}
                  />
                ))}
              </div>

              <div className="flex-1 space-y-6">
                {rightColumnItems.map((ambiente) => (
                  <FormField
                    key={ambiente.name}
                    ambiente={ambiente}
                    control={control}
                    errors={errors}
                    quantidadeQuartosValue={quantidadeQuartosValue}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Avançar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}