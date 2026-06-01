"use client";

import { useState, type KeyboardEvent } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import { formControlClass, formErrorClass, formLabelClass } from "../lib/listingStyles";
import {
  CHARACTERISTIC_SUGGESTIONS,
  MAX_CHARACTERISTICS,
  MAX_CHARACTERISTIC_LENGTH,
  genderizeCharacteristic,
  normalizeCharacteristics,
  type PetSex,
} from "../lib/characteristicsOptions";

type CharacteristicsFieldProps = {
  value: string[];
  onChange: (next: string[]) => void;
  sex: PetSex;
  error?: string;
};

const chipBaseClass =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition";

const selectedChipClass = `${chipBaseClass} border-accent bg-accent text-white`;

const unselectedChipClass = `${chipBaseClass} border-(--border-input) bg-white text-neutral-700 hover:border-(--accent-border-55) hover:bg-(--accent-overlay-5) disabled:cursor-not-allowed disabled:opacity-50`;

export default function CharacteristicsField({
  value,
  onChange,
  sex,
  error,
}: CharacteristicsFieldProps) {
  const [draft, setDraft] = useState("");

  const atMax = value.length >= MAX_CHARACTERISTICS;
  const has = (candidate: string) =>
    value.some((item) => item.toLowerCase() === candidate.toLowerCase());

  const add = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || atMax || has(trimmed)) return;
    onChange(normalizeCharacteristics([...value, trimmed]));
  };

  const remove = (item: string) => onChange(value.filter((current) => current !== item));

  const toggleSuggestion = (suggestion: string) => {
    const existing = value.find((item) => item.toLowerCase() === suggestion.toLowerCase());
    if (existing) {
      remove(existing);
    } else {
      add(suggestion);
    }
  };

  const commitDraft = () => {
    add(draft);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitDraft();
    }
  };

  const customValues = value.filter(
    (item) => !CHARACTERISTIC_SUGGESTIONS.some((s) => s.toLowerCase() === item.toLowerCase()),
  );

  return (
    <div>
      <span className={formLabelClass}>
        Características <span className="font-normal text-neutral-400">(opcional)</span>
      </span>
      <p className="-mt-1 mb-3 text-[13px] text-neutral-500">
        Se muestran como etiquetas en el listado. Elegí las que apliquen o agregá una propia.
      </p>

      <div className="flex flex-wrap gap-2">
        {CHARACTERISTIC_SUGGESTIONS.map((suggestion) => {
          const selected = has(suggestion);
          return (
            <button
              key={suggestion}
              type="button"
              aria-pressed={selected}
              disabled={!selected && atMax}
              onClick={() => toggleSuggestion(suggestion)}
              className={selected ? selectedChipClass : unselectedChipClass}
            >
              {genderizeCharacteristic(suggestion, sex)}
            </button>
          );
        })}
      </div>

      {customValues.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {customValues.map((item) => (
            <span key={item} className={selectedChipClass}>
              {item}
              <button
                type="button"
                aria-label={`Quitar ${item}`}
                onClick={() => remove(item)}
                className="-mr-1 inline-flex items-center justify-center rounded-full p-0.5 transition hover:bg-white/20"
              >
                <FiX className="h-3.5 w-3.5" aria-hidden />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, MAX_CHARACTERISTIC_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder="Agregar otra característica…"
          disabled={atMax}
          maxLength={MAX_CHARACTERISTIC_LENGTH}
          className={`${formControlClass} disabled:cursor-not-allowed disabled:opacity-60`}
        />
        <button
          type="button"
          onClick={commitDraft}
          disabled={atMax || !draft.trim()}
          className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-xl border border-(--accent-border-35) bg-white px-4 text-sm font-semibold text-accent transition hover:border-(--accent-border-55) hover:bg-(--accent-overlay-5) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiPlus className="h-4 w-4" aria-hidden />
          Agregar
        </button>
      </div>

      <p className="mt-1.5 text-xs text-neutral-400">
        {value.length}/{MAX_CHARACTERISTICS}
      </p>

      {error ? <p className={formErrorClass}>{error}</p> : null}
    </div>
  );
}
