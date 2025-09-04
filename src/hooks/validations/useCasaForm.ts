import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Schema de validação ---
export const CasaSchema = z.object({
  piso: z.string().min(1, "Selecione o tipo de piso"),
  telhado: z.string().min(1, "Selecione o tipo de telhado"),
  janela: z.string().min(1, "Selecione o tipo de janela"),
  porta: z.string().min(1, "Selecione o tipo de porta"),
  garagem: z.string().min(1, "Selecione a garagem"),
  paredes: z.string().min(1, "Selecione o tipo de paredes"),
  cozinha: z.string().min(1, "Selecione o tipo de cozinha"),
  banheiro: z.string().min(1, "Selecione o banheiro"),
  quarto: z.string().min(1, "Selecione o quarto"),
  sala: z.string().min(1, "Selecione a sala"),
  areaExterna: z.string().min(1, "Selecione a área externa"),
  acabamento: z.string().min(1, "Selecione o acabamento"),
  iluminacao: z.string().min(1, "Selecione o tipo de iluminação"),
  energiaSolar: z.string().min(1, "Informe se possui energia solar"),
  piscina: z.string().min(1, "Informe se possui piscina"),
});

// --- Tipo do formulário ---
export type CasaForm = z.infer<typeof CasaSchema>;

// --- Hook reutilizável ---
export function useCasaForm() {
  return useForm<CasaForm>({
    resolver: zodResolver(CasaSchema),
    defaultValues: {
      piso: "",
      telhado: "",
      janela: "",
      porta: "",
      garagem: "",
      paredes: "",
      cozinha: "",
      banheiro: "",
      quarto: "",
      sala: "",
      areaExterna: "",
      acabamento: "",
      iluminacao: "",
      energiaSolar: "",
      piscina: "",
    },
  });
}
