"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { FiCheckCircle, FiImage, FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";

import { formErrorClass, formLabelClass } from "../lib/listingStyles";
import {
  LISTING_IMAGE_MAX_BYTES,
  deleteListingImageByUrl,
  validateListingImageFile,
} from "../lib/listingImageUpload";

type ListingImageUploaderProps = {
  value: string;
  /** URL present when the form was first loaded (used to avoid deleting it on cancel). */
  initialValue?: string;
  onChange: (url: string) => void;
  error?: string;
};

const maxSizeLabel = `${Math.round(LISTING_IMAGE_MAX_BYTES / (1024 * 1024))} MB`;

type UploadResponse = {
  url?: string;
  message?: string;
};

async function uploadListingImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/listings/image", {
    method: "POST",
    body: formData,
  });

  let payload: UploadResponse = {};

  try {
    payload = (await response.json()) as UploadResponse;
  } catch {}

  if (!response.ok || !payload.url) {
    throw new Error(payload.message ?? "No pudimos subir la imagen. Intentá nuevamente.");
  }

  return payload.url;
}

function isRemoteImage(url: string) {
  return /^https?:\/\//.test(url);
}

export default function ListingImageUploader({
  value,
  initialValue = "",
  onChange,
  error,
}: ListingImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    const validation = validateListingImageFile(file);

    if (validation === "type") {
      setLocalError("Formato no permitido. Usá JPG, PNG o WEBP.");
      return;
    }

    if (validation === "size") {
      setLocalError(`La imagen supera el máximo de ${maxSizeLabel}.`);
      return;
    }

    setLocalError(null);
    setUploading(true);

    const previousValue = value;

    try {
      const url = await uploadListingImageFile(file);

      // Clean up an image uploaded earlier in this same session that is now orphaned.
      if (previousValue && previousValue !== initialValue) {
        await deleteListingImageByUrl(previousValue);
      }

      onChange(url);
    } catch (uploadError) {
      setLocalError(
        uploadError instanceof Error
          ? uploadError.message
          : "No pudimos subir la imagen. Intentá nuevamente.",
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (uploading) {
      return;
    }

    void handleFile(event.dataTransfer.files?.[0]);
  };

  const handleRemove = async () => {
    const removed = value;
    onChange("");
    setLocalError(null);

    if (removed && removed !== initialValue) {
      await deleteListingImageByUrl(removed);
    }
  };

  const shownError = error ?? localError ?? undefined;

  return (
    <div>
      <span className={formLabelClass}>Foto principal</span>

      {value ? (
        <div className="flex items-center gap-4 rounded-2xl border border-[var(--border-input)] bg-white p-3 sm:p-4">
          <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--warm-sand)] ring-1 ring-black/5">
            <Image
              src={value}
              alt="Vista previa de la foto"
              fill
              unoptimized={isRemoteImage(value)}
              sizes="112px"
              className="object-cover"
            />

            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <FiLoader className="h-6 w-6 animate-spin text-white" aria-hidden />
              </div>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--neutral-700)]">
              <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
              Foto cargada
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border-35)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-overlay-8)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiUploadCloud className="h-3.5 w-3.5" aria-hidden />
                Cambiar
              </button>
              <button
                type="button"
                onClick={() => void handleRemove()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiTrash2 className="h-3.5 w-3.5" aria-hidden />
                Quitar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
            dragActive
              ? "border-[var(--accent)] bg-[var(--accent-overlay-5)]"
              : "border-[var(--border-input)] bg-white hover:border-[var(--accent-border-55)] hover:bg-[var(--accent-overlay-5)]"
          } ${uploading ? "pointer-events-none opacity-70" : ""}`}
        >
          {uploading ? (
            <FiLoader className="h-8 w-8 animate-spin text-[var(--accent)]" aria-hidden />
          ) : (
            <FiImage className="h-8 w-8 text-[var(--neutral-400)]" aria-hidden />
          )}
          <span className="text-sm font-semibold text-[var(--neutral-700)]">
            {uploading ? "Optimizando y subiendo..." : "Arrastrá una foto o hacé clic para subir"}
          </span>
          <span className="text-xs text-[var(--neutral-500)]">
            JPG, PNG o WEBP · se optimiza automáticamente
          </span>
        </label>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleInputChange}
        disabled={uploading}
      />

      {shownError ? <p className={formErrorClass}>{shownError}</p> : null}
    </div>
  );
}
