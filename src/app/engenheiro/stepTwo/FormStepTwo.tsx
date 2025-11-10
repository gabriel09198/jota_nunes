"use client";

import { useForm, Controller, Control, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthGuard } from "@/hooks/validations/useAuthGuard";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const toFieldName = (label: string) =>
  label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .trim()
    .split(/\s+/)
    .map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w))
    .join("");

const secoes = [
  {
    titulo: "UNIDADES PRIVATIVAS",
    subtitulos: [
      "Sala de Estar/Jantar",
      "Circulação",
      "Quarto e Suíte",
      "Sanitário/ Lavabo",
      "Cozinha/ Área de Serviço",
      "Área Técnica",
      "Varanda",
      "Garden",
    ],
  },
  {
    titulo: "ÁREA COMUM",
    subtitulos: [
      "Guarita",
      "Gourmets",
      "Quiosques",
      "Copa Funcionários",
      "Petplay",
      "Parque Infantil",
      "Brinquedoteca",
      "Salão de Festas",
      "Bicicletário",
      "Salão de jogos",
      "Academia",
      "Administração",
      "Quadra Esportiva",
      "Quadra de Areia",
      "Piscina Adulto/ Infantil/ Deck",
      "Gerador",
      "Casa de lixo",
      "Vestiário Feminino/ Masculino",
      "Escadaria das torres",
      "Depósito (DML)",
      "Muro de fechamento do condomínio",
      "Hall’s do lazer e torres",
      "Instalações Gerais",
      "Vias internas e estacionamentos das unidades",
      "Jardins",
      "Passeio externo",
      "Portão de veículos (externo)",
    ],
  },
];

const formSections = secoes.map((secao) => ({
  titulo: secao.titulo,
  ambientes: secao.subtitulos.map((nome) => ({
    label: nome,
    name: toFieldName(nome),
  })),
}));

const allFieldNames = formSections.flatMap((s) =>
  s.ambientes.map((a) => a.name)
);

const fieldToLabelMap = Object.fromEntries(
  formSections.flatMap((s) => s.ambientes.map((a) => [a.name, a.label]))
);

const dynamicBooleans = Object.fromEntries(
  allFieldNames.map((n) => [n, z.boolean()])
) as Record<string, z.ZodBoolean>;

const CasaFormSchema = z.object({
  ...dynamicBooleans,
  quartoESuite: z.boolean(),
  sanitarioLavabo: z.boolean(),
  quartoESuiteQuantidade: z.number().optional(),
  sanitarioLavaboQuantidade: z.number().optional(),
});

export type CasaForm = z.infer<typeof CasaFormSchema>;

const defaultValues: CasaForm = {
  ...Object.fromEntries(allFieldNames.map((n) => [n, false])),
  quartoESuite: false,
  sanitarioLavabo: false,
};

/* TIPOS */
interface Ambiente {
  label: string;
  name: string; // string porque muitos nomes são gerados dinamicamente
}

interface FormFieldProps {
  ambiente: Ambiente;
  control: Control<CasaForm>;
  quartoChecked: boolean;
  sanitarioChecked: boolean;
}

/* COMPONENTE FormField SEM any e sem param 'label' não usado */
const FormField: React.FC<FormFieldProps> = ({
  ambiente,
  control,
  quartoChecked,
  sanitarioChecked,
}) => {
  const renderQuantity = (name: Path<CasaForm>) => (
    <div className="mt-4">
      <label className="block text-gray-700 font-medium mb-1">
        Informe a Quantidade:
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            min={1}
            value={typeof field.value === "number" ? field.value : ""}
            onChange={(e) =>
              field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 placeholder-gray-400"
          />
        )}
      />
    </div>
  );

  return (
    <Controller
      // usamos Path<CasaForm> no cast para evitar 'any'
      name={ambiente.name as Path<CasaForm>}
      control={control}
      render={({ field }) => (
        <div>
          <label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer has-[:checked]:bg-red-50 has-[:checked]:border-red-600">
            <span className="text-lg text-gray-700 font-semibold has-[:checked]:text-red-800">
              {ambiente.label}
            </span>
            <div className="relative h-6 w-6">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                ref={field.ref}
              />
              <div className="w-6 h-6 rounded border-2 border-gray-300 peer-checked:bg-red-600 peer-checked:border-red-600 flex items-center justify-center">
                <div className="hidden peer-checked:block">
                  <CheckIcon />
                </div>
              </div>
            </div>
          </label>

          {ambiente.name === "quartoESuite" &&
            quartoChecked &&
            renderQuantity("quartoESuiteQuantidade" as Path<CasaForm>)}

          {ambiente.name === "sanitarioLavabo" &&
            sanitarioChecked &&
            renderQuantity("sanitarioLavaboQuantidade" as Path<CasaForm>)}
        </div>
      )}
    />
  );
};

/* PAGINA PRINCIPAL */
export default function StepTwoPage() {
  const router = useRouter();
  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<CasaForm>({
      resolver: zodResolver(CasaFormSchema),
      defaultValues,
    });
    

  const quartoChecked = watch("quartoESuite");
  const sanitarioChecked = watch("sanitarioLavabo");
  const isAuthChecked = useAuthGuard();

  useEffect(() => {
    setValue(
      "quartoESuiteQuantidade",
      quartoChecked ? getValues("quartoESuiteQuantidade") || 1 : undefined
    );
  }, [quartoChecked, setValue, getValues]);

  useEffect(() => {
    setValue(
      "sanitarioLavaboQuantidade",
      sanitarioChecked
        ? getValues("sanitarioLavaboQuantidade") || 1
        : undefined
    );
  }, [sanitarioChecked, setValue, getValues]);

  if (!isAuthChecked) {
    return ;
  }

  const onSubmit = (data: CasaForm) => {
    const selectedFields = Object.keys(data).filter(
      (key) => allFieldNames.includes(key) && data[key as keyof CasaForm]
    );

    const selectedRoomLabels = selectedFields.map(
      (fieldKey) => fieldToLabelMap[fieldKey]
    );

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedRooms", JSON.stringify(selectedRoomLabels));
      localStorage.setItem("formStepTwoData", JSON.stringify(data));
    }

    router.push("/engenheiro/stepThree");
  };

  return (
    <div className="bg-gradient-to-b min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
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
              <span className="text-base font-medium text-red-700">
                Passo 2 de 3
              </span>
              <span className="text-sm font-medium text-red-700">50%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full w-[50%]" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">
              Ambientes da Obra
            </h1>
            <p className="text-gray-500 mt-2">
              Selecione todos os ambientes que a obra possui.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {formSections.map((secao) => (
              <section key={secao.titulo}>
                <h2 className="text-2xl font-bold text-red-700 mb-6 border-b-2 border-red-200 pb-2">
                  {secao.titulo}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  {secao.ambientes.map((ambiente) => (
                    <FormField
                      key={ambiente.name}
                      ambiente={ambiente}
                      control={control}
                      quartoChecked={quartoChecked}
                      sanitarioChecked={sanitarioChecked}
                    />
                  ))}
                </div>
              </section>
            ))}

            <button
              type="submit"
              className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-red-500/50 transition-transform hover:-translate-y-1"
            >
              Avançar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
