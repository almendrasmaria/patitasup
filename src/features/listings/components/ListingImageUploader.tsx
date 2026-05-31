"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type RefObject,
} from "react";
import { FiImage, FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";

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
  /**
   * Set to true by the parent once the listing was saved. While false, an image
   * uploaded in this session is removed from storage when the form unmounts so
   * cancelling the form doesn't leave orphaned files in the bucket.
   */
  committedRef?: RefObject<boolean>;
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
  committedRef,
  onChange,
  error,
}: ListingImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Keep the latest value/initialValue in refs so the unmount cleanup below can
  // read them without re-running and without capturing stale values.
  const latestValueRef = useRef(value);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    return () => {
      const current = latestValueRef.current;
      const saved = committedRef?.current ?? false;

      // If the form is abandoned with an image that was uploaded this session
      // (i.e. not the original one), drop it so it doesn't orphan in storage.
      if (!saved && current && current !== initialValueRef.current) {
        void deleteListingImageByUrl(current);
      }
    };
  }, [committedRef]);

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
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-input)] bg-[var(--warm-sand)]">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={value}
              alt="Vista previa de la foto"
              fill
              unoptimized={isRemoteImage(value)}
              sizes="(max-width: 640px) 100vw, 480px"
              className="object-cover"
            />

            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <FiLoader className="h-7 w-7 animate-spin text-white" aria-hidden />
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[var(--border-hairline)] bg-white px-4 py-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiUploadCloud className="h-4 w-4" aria-hidden />
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => void handleRemove()}
              disabled={uploading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiTrash2 className="h-4 w-4" aria-hidden />
              Quitar
            </button>
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
