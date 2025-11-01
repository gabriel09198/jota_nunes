"use client";

import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckIcon = () => (<svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>);

const toFieldName = (label: string) => {
    return label
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') 
        .replace(/\s+/g, ' ')       
        .trim()
        .split(' ')
        .map((word, index) => 
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        ) 
        .join('');
};

const secoes = [
    {
        titulo: "UNIDADES PRIVATIVAS",
        subtitulos: [
            "Sala de Estar/Jantar", "Circulação", "Quarto e Suíte", "Sanitário/ Lavabo",
            "Cozinha/ Área de Serviço", "Área Técnica", "Varanda", "Garden"
        ]
    },
    {
        titulo: "ÁREA COMUM",
        subtitulos: [
            "Guarita", "Gourmets", "Quiosques", "Copa Funcionários", "Petplay",
            "Parque Infantil", "Brinquedoteca", "Salão de Festas", "Bicicletário",
            "Salão de jogos", "Academia", "Administração", "Quadra Esportiva",
            "Quadra de Areia", "Piscina Adulto/ Infantil/ Deck", "Gerador",
            "Casa de lixo", "Vestiário Feminino/ Masculino", "Escadaria das torres",
            "Depósito (DML)", "Muro de fechamento do condomínio", "Hall’s do lazer e torres",
            "Instalações Gerais", "Vias internas e estacionamentos das unidades",
            "Jardins", "Passeio externo", "Portão de veículos (externo)"
        ]
    }
];

const formSections = secoes.map(secao => ({
    titulo: secao.titulo,
    ambientes: secao.subtitulos.map(subtituloNome => ({
        label: subtituloNome,
        name: toFieldName(subtituloNome) 
    }))
}));

const allFieldNames = formSections.flatMap(s => s.ambientes.map(a => a.name));

const schemaObject = allFieldNames.reduce((acc, name) => {
    acc[name] = z.boolean();
    return acc;
}, {} as Record<string, z.ZodBoolean>);

const CasaFormSchema = z.object(schemaObject);
type CasaForm = z.infer<typeof CasaFormSchema>;

const defaultValues = allFieldNames.reduce((acc, name) => {
    acc[name] = false;
    return acc;
}, {} as { [key: string]: boolean });


interface FormFieldProps {
  ambiente: { label: string; name: string };
  control: Control<CasaForm>;
}

const FormField = ({ ambiente, control }: FormFieldProps) => (
    <Controller
        name={ambiente.name as keyof CasaForm}
        control={control}
        render={({ field }) => (
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
                        <div className="hidden peer-checked:block"><CheckIcon /></div>
                    </div>
                </div>
            </label>
        )}
    />
);

export default function StepTwoPage() {
    const router = useRouter();
    const { control, handleSubmit } = useForm<CasaForm>({
        resolver: zodResolver(CasaFormSchema),
        defaultValues: defaultValues, 
    });

    const onSubmit = (data: CasaForm) => {
        console.log("Dados do Formulário (Step 2):", data);
        router.push("/engenheiro/stepThree");
    };

    return (
        <div className="bg-gradient-to-b min-h-screen">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-8">
                    <Image src="/imagens/logo_branca.png" alt="Logo" width={150} height={150} className="mx-auto" />
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
                        <h1 className="text-3xl font-bold text-gray-800">Ambientes da Obra</h1>
                        <p className="text-gray-500 mt-2">Selecione todos os ambientes que o imóvel possui.</p>
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
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                        
                        <div className="pt-6">
                            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                Avançar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}