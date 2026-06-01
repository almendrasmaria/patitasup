"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowLeft, FiArrowRight, FiSave, FiUploadCloud } from "react-icons/fi";

import MinimalSelect from "@/components/ui/MinimalSelect";
import { getLocalidadesCaba, type GeorefLocalidad } from "@/features/geo/lib/georefClient";

import { formControlClass, formErrorClass, formLabelClass } from "../lib/listingStyles";
import type {
  PublicationFormSpecies,
  PublicationFormStatus,
  PublicationFormValues,
} from "../types";
import { deleteListingImageByUrl } from "../lib/listingImageUpload";
import FormStepper, { type FormStep } from "./FormStepper";
import ListingImageUploader from "./ListingImageUploader";
import OptionToggleGroup from "./OptionToggleGroup";
import PublishConfirmDialog from "./PublishConfirmDialog";

type ListingFormState = {
  petName: string;
  ageValue: string;
  ageUnit: "days" | "months" | "years";
  sex: "male" | "female";
  species: PublicationFormSpecies;
  location: string;
  rescueInstagram: string;
  imageUrl: string;
  description: string;
  status: PublicationFormStatus;
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
  species: "cat",
  location: "",
  rescueInstagram: "",
  imageUrl: "",
  description: "",
  status: "active",
};

const sexOptions: { value: ListingFormState["sex"]; label: string }[] = [
  { value: "female", label: "Hembra" },
  { value: "male", label: "Macho" },
];

const ageUnitOptions: { value: ListingFormState["ageUnit"]; label: string }[] = [
  { value: "days", label: "Días" },
  { value: "months", label: "Meses" },
  { value: "years", label: "Años" },
];

const speciesOptions: { value: PublicationFormSpecies; label: string }[] = [
  { value: "cat", label: "Gato" },
  { value: "dog", label: "Perro" },
];

const STEP_ONE_FIELDS: ListingFieldName[] = [
  "petName",
  "ageValue",
  "ageUnit",
  "sex",
  "species",
  "location",
  "imageUrl",
];

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-65";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-input)] bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[var(--accent-border-55)] hover:bg-[var(--accent-overlay-5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const cardClass = "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6";

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 30 : -30 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -30 : 30 }),
};

function buildFormState(initialValues?: PublicationFormValues): ListingFormState {
  if (!initialValues) {
    return initialForm;
  }

  return {
    petName: initialValues.petName,
    ageValue: String(initialValues.ageValue),
    ageUnit: initialValues.ageUnit,
    sex: initialValues.sex,
    species: initialValues.species,
    location: initialValues.location,
    rescueInstagram: initialValues.rescueInstagram,
    imageUrl: initialValues.imageUrl,
    description: initialValues.description,
    status: initialValues.status,
  };
}

function getFieldError(fieldErrors: ApiResponse["fieldErrors"], fieldName: ListingFieldName) {
  return fieldErrors?.[fieldName]?.[0];
}

function CardHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-(--border-hairline) pb-4">
      <h2 className="text-base font-semibold text-(--foreground-inverse)">{title}</h2>
      <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

export default function NewListingForm({
  mode = "create",
  listingId,
  initialValues,
}: NewListingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ListingFormState>(() => buildFormState(initialValues));
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState(1);
  const [fieldErrors, setFieldErrors] = useState<ApiResponse["fieldErrors"]>({});
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  // True once the listing was saved, so we keep the uploaded photo instead of
  // cleaning it up when the form unmounts.
  const imageCommittedRef = useRef(false);

  const isEditing = mode === "edit";
  const initialFormState = useMemo(() => buildFormState(initialValues), [initialValues]);

  // Keep the latest/initial image URLs in refs so the unmount cleanup below can
  // drop a session-uploaded image that was never committed (form abandoned)
  // without deleting an image that belongs to a saved listing.
  const latestImageUrlRef = useRef(form.imageUrl);
  const initialImageUrlRef = useRef(initialFormState.imageUrl);

  useEffect(() => {
    latestImageUrlRef.current = form.imageUrl;
  }, [form.imageUrl]);

  useEffect(() => {
    initialImageUrlRef.current = initialFormState.imageUrl;
  }, [initialFormState.imageUrl]);

  useEffect(() => {
    return () => {
      const current = latestImageUrlRef.current;
      const saved = imageCommittedRef.current;

      // If the form is abandoned with an image uploaded during this session
      // (i.e. not the original one), drop it so it doesn't orphan in storage.
      if (!saved && current && current !== initialImageUrlRef.current) {
        void deleteListingImageByUrl(current);
      }
    };
  }, []);

  const isDirty = useMemo(
    () =>
      form.petName !== initialFormState.petName ||
      form.ageValue !== initialFormState.ageValue ||
      form.ageUnit !== initialFormState.ageUnit ||
      form.sex !== initialFormState.sex ||
      form.species !== initialFormState.species ||
      form.location !== initialFormState.location ||
      form.rescueInstagram !== initialFormState.rescueInstagram ||
      form.imageUrl !== initialFormState.imageUrl ||
      form.description !== initialFormState.description ||
      form.status !== initialFormState.status,
    [form, initialFormState],
  );

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

  const locationSelectOptions = useMemo(
    () => selectableLocations.map((locationName) => ({ value: locationName, label: locationName })),
    [selectableLocations],
  );

  const updateField =
    (fieldName: ListingFieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((currentForm) => ({ ...currentForm, [fieldName]: event.target.value }));
      setFieldErrors((currentErrors) => ({ ...currentErrors, [fieldName]: undefined }));
    };

  const setFieldValue = (fieldName: ListingFieldName, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [fieldName]: undefined }));
  };

  const goToStep = (next: 1 | 2) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // On create, publishing vs. saving as draft is chosen in the dialog. On
    // edit, the publication's status is managed elsewhere, so just save.
    if (isEditing) {
      void doSubmit();
    } else {
      setShowPublishDialog(true);
    }
  };

  const doSubmit = async (statusOverride?: PublicationFormStatus) => {
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
        status: statusOverride ?? form.status,
        ageValue: Number(form.ageValue),
      }),
    });

    let payload: ApiResponse = {};

    try {
      payload = (await response.json()) as ApiResponse;
    } catch {}

    if (!response.ok) {
      setShowPublishDialog(false);
      setMessage(payload.message ?? "No pudimos guardar la publicación.");
      setFieldErrors(payload.fieldErrors ?? {});

      const hasStepOneError = STEP_ONE_FIELDS.some((fieldName) => payload.fieldErrors?.[fieldName]);
      if (hasStepOneError) {
        goToStep(1);
      }

      setSubmitting(false);
      return;
    }

    imageCommittedRef.current = true;
    router.push("/my-listings");
    router.refresh();
  };

  const title = isEditing ? "Editar publicación" : "Nueva publicación";
  const steps: FormStep[] = [
    { id: 1, title: "Información", subtitle: "Datos y foto" },
    { id: 2, title: "Descripción", subtitle: "Su historia" },
  ];
  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <header className="flex items-center gap-3">
        <Link
          href="/my-listings"
          aria-label="Volver a mis publicaciones"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--border-hairline) bg-white text-neutral-700 shadow-sm transition hover:border-(--accent-border-30) hover:text-accent"
        >
          <FiArrowLeft className="h-5 w-5" aria-hidden />
        </Link>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-(--foreground-inverse)">
            {title}
          </h1>
        </div>
      </header>

      <FormStepper steps={steps} current={step} />

      {message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {message}
        </div>
      ) : null}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="space-y-6"
        >
          {step === 1 ? (
            <>
          <section className={cardClass}>
            <CardHeader title="Información básica" subtitle="Datos principales de la mascota" />

            <div className="space-y-5 pt-5">
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className={formLabelClass}>Edad</span>
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(7rem,0.7fr)] gap-3">
                    <input
                      id="ageValue"
                      name="ageValue"
                      type="number"
                      min="1"
                      value={form.ageValue}
                      onChange={updateField("ageValue")}
                      placeholder="Ej: 8"
                      className={formControlClass}
                      aria-label="Edad"
                      required
                    />
                    <MinimalSelect
                      ariaLabel="Unidad de edad"
                      value={form.ageUnit}
                      onChange={(value) => setFieldValue("ageUnit", value)}
                      options={ageUnitOptions}
                    />
                  </div>
                  {getFieldError(fieldErrors, "ageValue") ? (
                    <p className={formErrorClass}>{getFieldError(fieldErrors, "ageValue")}</p>
                  ) : null}
                </div>

                <div>
                  <span className={formLabelClass}>Sexo</span>
                  <OptionToggleGroup
                    ariaLabel="Sexo de la mascota"
                    options={sexOptions}
                    value={form.sex}
                    onChange={(value) => setFieldValue("sex", value)}
                  />
                </div>

                <div>
                  <span className={formLabelClass}>Tipo de mascota</span>
                  <MinimalSelect
                    ariaLabel="Tipo de mascota"
                    value={form.species}
                    onChange={(value) => setFieldValue("species", value)}
                    options={speciesOptions}
                  />
                  {getFieldError(fieldErrors, "species") ? (
                    <p className={formErrorClass}>{getFieldError(fieldErrors, "species")}</p>
                  ) : null}
                </div>

                <div>
                  <span className={formLabelClass}>Ubicación</span>
                  <MinimalSelect
                    ariaLabel="Ubicación"
                    value={form.location}
                    onChange={(value) => setFieldValue("location", value)}
                    options={locationSelectOptions}
                    placeholder={locationsLoading ? "Cargando ubicaciones..." : "Seleccioná una ubicación real"}
                    disabled={locationsLoading}
                  />
                  {locationsError ? (
                    <p className={formErrorClass}>No pudimos cargar las ubicaciones: {locationsError}</p>
                  ) : null}
                  {getFieldError(fieldErrors, "location") ? (
                    <p className={formErrorClass}>{getFieldError(fieldErrors, "location")}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <CardHeader title="Foto" subtitle="Subí la foto principal de la mascota" />

            <div className="pt-5">
              <ListingImageUploader
                value={form.imageUrl}
                initialValue={initialFormState.imageUrl}
                onChange={(url) => setFieldValue("imageUrl", url)}
                error={getFieldError(fieldErrors, "imageUrl")}
              />
            </div>
          </section>

          <div className="flex items-center justify-between gap-3">
            <Link
              href="/my-listings"
              className="text-sm font-medium text-neutral-500 transition hover:text-neutral-700"
            >
              Cancelar
            </Link>
            <motion.button
              type="button"
              onClick={() => goToStep(2)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={primaryButtonClass}
            >
              Siguiente
              <FiArrowRight className="h-5 w-5" aria-hidden />
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <section className={cardClass}>
            <CardHeader title="Descripción" subtitle="Contá su historia y personalidad" />

            <div className="space-y-5 pt-5">
              <div>
                <label htmlFor="description" className={formLabelClass}>
                  Sobre la mascota
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={updateField("description")}
                  placeholder="Contá cómo es, qué necesita y qué tipo de familia buscás..."
                  className={`${formControlClass} min-h-36 resize-y py-3 leading-6`}
                  required
                />
                {getFieldError(fieldErrors, "description") ? (
                  <p className={formErrorClass}>{getFieldError(fieldErrors, "description")}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="rescueInstagram" className={formLabelClass}>
                  Instagram <span className="font-normal text-neutral-400">(opcional)</span>
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
            </div>
          </section>

          <div className="flex items-center justify-between gap-3">
            <motion.button
              type="button"
              onClick={() => goToStep(1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={outlineButtonClass}
            >
              <FiArrowLeft className="h-5 w-5" aria-hidden />
              Atrás
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={primaryButtonClass}
              disabled={submitting || !isDirty}
            >
              {isEditing ? <FiSave className="h-5 w-5" aria-hidden /> : <FiUploadCloud className="h-5 w-5" aria-hidden />}
              {submitting
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Subir publicación"}
            </motion.button>
          </div>
        </>
          )}
        </motion.div>
      </AnimatePresence>

      {!isEditing ? (
        <PublishConfirmDialog
          open={showPublishDialog}
          petName={form.petName}
          loading={submitting}
          onPublish={() => void doSubmit("active")}
          onSaveDraft={() => void doSubmit("draft")}
          onCancel={() => setShowPublishDialog(false)}
        />
      ) : null}
    </form>
  );
}
