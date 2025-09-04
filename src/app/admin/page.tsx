"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";

const countries = ["Brasil", "Portugal", "Angola", "Moçambique"];

export default function CountrySelect() {
  const [query, setQuery] = useState<string | null>(null);

  const filtered =
    !query || query === ""
      ? countries
      : countries.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-64">
      <Combobox value={query} onChange={setQuery}>
        <div className="relative">
          {/* Input */}
          <Combobox.Input
            displayValue={(v: string | null) => v ?? ""}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite ou selecione..."
            className="w-full rounded border p-2 bg-white"
            autoComplete="off"
          />

          {/* Botão para abrir o dropdown */}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
            ▼
          </Combobox.Button>

          {/* Lista de opções */}
          <Combobox.Options className="absolute z-10 mt-1 w-full rounded border bg-white shadow-lg max-h-60 overflow-auto">
            {filtered.length === 0 && query !== "" ? (
              <div className="p-2 text-gray-500">Nenhum resultado</div>
            ) : (
              filtered.map((c) => (
                <Combobox.Option
                  key={c}
                  value={c}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${
                      active ? "bg-gray-200 text-black" : "text-gray-700"
                    }`
                  }
                >
                  {c}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
