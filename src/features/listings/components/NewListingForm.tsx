"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { FiCheck, FiSave } from "react-icons/fi";

import { getLocalidadesCaba, type GeorefLocalidad } from "@/features/cats/lib/georefClient";

import {
  formControlClass,
  formErrorClass,
  formLabelClass,
  primaryCtaClass,
} from "../lib/listingStyles";
import type { PublicationFormStatus, PublicationFormValues } from "../types";

type ListingFormState = {
  petName: string;
  ageValue: string;
  ageUnit: "days" | "months" | "years";
  sex: "male" | "female";
  location: string;
  rescueInstagram: string;
  imageUrl: string;
  description: string;
  status: "active" | "draft";
};

type ListingFieldName = keyof ListingFormState;

type ApiResponse = {
  message?: string;
  fieldErrors?: Partial<Record<ListingFieldName, string[]>>;
};

type NewListingFormProps = {
  mode?: "create" | "edit";
  listingId?: string;
  initialValues?: PublicationFormValues;
};

const initialForm: ListingFormState = {
  petName: "",
  ageValue: "",
  ageUnit: "months",
  sex: "female",
  location: "",
  rescueInstagram: "",
  imageUrl: "",
  description: "",
  status: "active",
};

const statusOptions: { value: PublicationFormStatus; label: string }[] = [
  { value: "active", label: "Activa" },
  { value: "adopted", label: "Adoptada" },
  { value: "draft", label: "Borrador" },
];

function buildFormState(initialValues?: PublicationFormValues): ListingFormState {
  if (!initialValues) {
    return initialForm;
  }

  return {
    petName: initialValues.petName,
    ageValue: String(initialValues.ageValue),
    ageUnit: initialValues.ageUnit,
    sex: initialValues.sex,
    location: initialValues.location,
    rescueInstagram: initialValues.rescueInstagram,
    imageUrl: initialValues.imageUrl,
    description: initialValues.description,
    status: initialValues.status,
  };
}

function getFieldError(
  fieldErrors: ApiResponse["fieldErrors"],
  fieldName: ListingFieldName,
) {
  return fieldErrors?.[fieldName]?.[0];
}

export default function NewListingForm({
  mode = "create",
  listingId,
  initialValues,
}: NewListingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ListingFormState>(() => buildFormState(initialValues));
  const [fieldErrors, setFieldErrors] = useState<ApiResponse["fieldErrors"]>({});
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  const isEditing = mode === "edit";

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setLocationsLoading(true);
        setLocationsError(null);

        const localidades: GeorefLocalidad[] = await getLocalidadesCaba();

        if (!alive) {
          return;
        }

        setLocationOptions(localidades.map((localidad) => localidad.nombre));
      } catch (error) {
        if (!alive) {
          return;
        }

        setLocationsError(
          error instanceof Error ? error.message : "No pudimos cargar las ubicaciones.",
        );
        setLocationOptions([]);
      } finally {
        if (alive) {
          setLocationsLoading(false);
        }
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, []);

  const selectableLocations = useMemo(() => {
    if (form.location && !locationOptions.includes(form.location)) {
      return [form.location, ...locationOptions];
    }

    return locationOptions;
  }, [form.location, locationOptions]);

  const updateField =
    (fieldName: ListingFieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((currentForm) => ({ ...currentForm, [fieldName]: event.target.value }));
      setFieldErrors((currentErrors) => ({ ...currentErrors, [fieldName]: undefined }));
    };

  const handleStatusChange = (status: ListingFormState["status"]) => {
    setForm((currentForm) => ({ ...currentForm, status }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, status: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setFieldErrors({});

    const endpoint = isEditing && listingId ? `/api/listings/${listingId}` : "/api/listings";
    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        ageValue: Number(form.ageValue),
      }),
    });

    let payload: ApiResponse = {};

    try {
      payload = (await response.json()) as ApiResponse;
    } catch {}

    if (!response.ok) {
      setMessage(payload.message ?? "No pudimos guardar la publicación.");
      setFieldErrors(payload.fieldErrors ?? {});
      setSubmitting(false);
      return;
    }

    router.push("/my-listings");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="petName" className={formLabelClass}>
            Nombre
          </label>
          <input
            id="petName"
            name="petName"
            type="text"
            value={form.petName}
            onChange={updateField("petName")}
            placeholder="Ej: Luna"
            className={formControlClass}
            autoComplete="off"
            required
          />
          {getFieldError(fieldErrors, "petName") ? (
            <p className={formErrorClass}>{getFieldError(fieldErrors, "petName")}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(8rem,0.75fr)] gap-3">
          <div>
            <label htmlFor="ageValue" className={formLabelClass}>
              Edad
            </label>
            <input
              id="ageValue"
              name="ageValue"
              type="number"
              min="1"
              value={form.ageValue}
              onChange={updateField("ageValue")}
              placeholder="Ej: 8"
              className={formControlClass}
              required
            />
            {getFieldError(fieldErrors, "ageValue") ? (
              <p className={formErrorClass}>{getFieldError(fieldErrors, "ageValue")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="ageUnit" className={formLabelClass}>
              Unidad
            </label>
            <select
              id="ageUnit"
              name="ageUnit"
              value={form.ageUnit}
              onChange={updateField("ageUnit")}
              className={formControlClass}
            >
              <option value="days">Días</option>
              <option value="months">Meses</option>
              <option value="years">Años</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sex" className={formLabelClass}>
            Sexo
          </label>
          <select
            id="sex"
            name="sex"
            value={form.sex}
            onChange={updateField("sex")}
            className={formControlClass}
          >
            <option value="female">Hembra</option>
            <option value="male">Macho</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className={formLabelClass}>
            Ubicación
          </label>
          <select
            id="location"
            name="location"
            value={form.location}
            onChange={updateField("location")}
            className={formControlClass}
            required
            disabled={locationsLoading}
          >
            <option value="">
              {locationsLoading ? "Cargando ubicaciones..." : "Seleccioná una ubicación real"}
            </option>
            {selectableLocations.map((locationName) => (
              <option key={locationName} value={locationName}>
                {locationName}
              </option>
            ))}
          </select>
          {locationsError ? <p className={formErrorClass}>No pudimos cargar las ubicaciones: {locationsError}</p> : null}
          {getFieldError(fieldErrors, "location") ? (
            <p className={formErrorClass}>{getFieldError(fieldErrors, "location")}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="rescueInstagram" className={formLabelClass}>
            Instagram
          </label>
          <input
            id="rescueInstagram"
            name="rescueInstagram"
            type="text"
            value={form.rescueInstagram}
            onChange={updateField("rescueInstagram")}
            placeholder="@patitasup"
            className={formControlClass}
            autoComplete="off"
          />
          {getFieldError(fieldErrors, "rescueInstagram") ? (
            <p className={formErrorClass}>{getFieldError(fieldErrors, "rescueInstagram")}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="imageUrl" className={formLabelClass}>
            Imagen
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={updateField("imageUrl")}
            placeholder="https://..."
            className={formControlClass}
            required
          />
          {getFieldError(fieldErrors, "imageUrl") ? (
            <p className={formErrorClass}>{getFieldError(fieldErrors, "imageUrl")}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={formLabelClass}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={updateField("description")}
          placeholder="Contá cómo es, qué necesita y qué tipo de familia buscás."
          className={`${formControlClass} min-h-36 resize-y py-3 leading-6`}
          required
        />
        {getFieldError(fieldErrors, "description") ? (
          <p className={formErrorClass}>{getFieldError(fieldErrors, "description")}</p>
        ) : null}
      </div>

      <div className="border-t border-[#ececf2] pt-6">
        <span className={formLabelClass}>Estado</span>
        <div role="radiogroup" aria-label="Estado de publicación" className="flex flex-wrap gap-2">
          {statusOptions.map((option) => {
            const selected = form.status === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleStatusChange(option.value)}
                className={
                  selected
                    ? "inline-flex items-center gap-2 rounded-full bg-[#7061F0] px-5 py-2 text-sm font-semibold text-white shadow-sm"
                    : "inline-flex items-center gap-2 rounded-full border border-[#7061F0]/35 bg-white px-5 py-2 text-sm font-semibold text-[#7061F0] transition hover:bg-[#7061F0]/5"
                }
              >
                {selected ? <FiCheck className="h-4 w-4" aria-hidden /> : null}
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-[#ececf2] pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          className={`${primaryCtaClass} justify-center disabled:cursor-not-allowed disabled:opacity-65`}
          disabled={submitting}
        >
          <FiSave className="h-5 w-5" aria-hidden />
          {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar publicación"}
        </button>
      </div>
    </form>
  );
}