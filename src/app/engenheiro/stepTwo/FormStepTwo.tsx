"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller, Control, Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/validations/useAuthGuard";
import { getAreas } from "@/services/areas";
import type { Area, Element } from "@/services/areas";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const recordSchema = z.record(z.string(), z.boolean());
type FormValues = z.infer<typeof recordSchema>;

const safeFieldName = (prefix: string, label: string): string =>
  `${prefix}_${label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase()}`;

const getElementLabel = (el: Element): string => {
  if (el.element_type?.name) return el.element_type.name;

  if (el.materials && el.materials.length > 0) {
    const first = el.materials[0];
    if (first?.name) return first.name;
  }

  return `Elemento #${el.id}`;
};

interface CheckboxFieldProps {
  label: string;
  name: string;
  control: Control<FormValues>;
}

const CheckboxField = ({ label, name, control }: CheckboxFieldProps) => (
  <Controller
    name={name as Path<FormValues>}
    control={control}
    render={({ field }) => (
      <label className="flex items-center justify-between cursor-pointer border rounded-xl px-4 py-3 hover:shadow-sm transition-all has-[:checked]:bg-red-50 has-[:checked]:border-red-600">
        <span className="text-lg text-gray-700 font-medium has-[:checked]:text-red-800">
          {label}
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
    )}
  />
);

export default function StepTwoPage() {
  const router = useRouter();
  const isAuthChecked = useAuthGuard();

  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const formData = watch();

  const fieldNames = useMemo(() => {
    const names: string[] = [];
    for (const area of areas) {
      const areaField = safeFieldName("area", area.area_name.name);
      names.push(areaField);

      for (const el of area.elements) {
        const elField = `element_${area.id}_${el.id}`; 
        names.push(elField);
      }
    }
    return names;
  }, [areas]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAreas();
        setAreas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    if (fieldNames.length === 0) return;
    const defaults: FormValues = Object.fromEntries(
      fieldNames.map((n) => [n, false])
    ) as FormValues;
    reset(defaults, { keepValues: false });
  }, [fieldNames, reset]);

  if (!isAuthChecked) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Carregando áreas...</p>
      </div>
    );
  }

  const onSubmit = (data: FormValues) => {
    const selectedAreas: string[] = [];
    const selectedElementsByArea: Record<string, string[]> = {};

    for (const area of areas) {
      const areaKey = safeFieldName("area", area.area_name.name);
      if (data[areaKey]) selectedAreas.push(area.area_name.name);

      const selectedEls: string[] = [];
      for (const el of area.elements) {
        const elKey = `element_${area.id}_${el.id}`;
        if (data[elKey]) selectedEls.push(getElementLabel(el));
      }

      if (selectedEls.length) {
        selectedElementsByArea[area.area_name.name] = selectedEls;
      }
    }

    if (selectedAreas.length === 0) {
      alert("Selecione pelo menos uma área.");
      return;
    }

    const hasAnyElementSelected = Object.values(selectedElementsByArea).some(
      (els) => els.length > 0
    );

    if (!hasAnyElementSelected) {
      alert("Selecione pelo menos um elemento.");
      return;
    }

    const payload = { areas: selectedAreas, elements: selectedElementsByArea, raw: data };
    localStorage.setItem("selectedStepTwo", JSON.stringify(payload));
    router.push("/engenheiro/stepThree");
  };

  return (
    <div className="bg-gradient-to-b min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <Image src="/imagens/logo.png" alt="Logo" width={150} height={150} className="mx-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Ambientes da Obra</h1>
            <p className="text-gray-500 mt-2">Selecione áreas e elementos.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Nome da Área</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {areas.map((area) => {
                  const areaField = safeFieldName("area", area.area_name.name);
                  return (
                    <CheckboxField
                      key={areaField}
                      label={area.area_name.name}
                      name={areaField}
                      control={control}
                    />
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Elementos</h2>
              {areas.map((area) => {
                const areaKey = safeFieldName("area", area.area_name.name);
                const isAreaSelected = formData[areaKey];

                if (!isAreaSelected) return null; 

                return (
                  <div key={`els-${area.id}`} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      {area.area_name.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {area.elements.length > 0 ? (
                        area.elements.map((el) => {
                          const label = getElementLabel(el);
                          const elField = `element_${area.id}_${el.id}`;
                          return (
                            <CheckboxField
                              key={elField}
                              label={label}
                              name={elField}
                              control={control}
                            />
                          );
                        })
                      ) : (
                        <p className="text-gray-400 italic">Sem elementos</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow transition-transform hover:-translate-y-1"
            >
              Avançar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}