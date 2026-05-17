const GEOREF_BASE_URL = "https://apis.datos.gob.ar/georef/api";

export type GeorefLocalidad = {
  id: string;
  nombre: string;
  categoria?: string;
};

let localidadesCabaPromise: Promise<GeorefLocalidad[]> | null = null;

function normalizeGeorefValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function fetchGeoref<T>(
  path: string,
  params: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(`${GEOREF_BASE_URL}${path}`);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Georef error ${res.status}`);
  return (await res.json()) as T;
}

export async function getLocalidadesCaba(): Promise<GeorefLocalidad[]> {
  if (!localidadesCabaPromise) {
    localidadesCabaPromise = fetchGeoref<{ localidades: GeorefLocalidad[] }>("/localidades", {
      provincia: "CABA",
      campos: "id,nombre,categoria",
      orden: "nombre",
      max: 200,
    })
      .then((data) => {
        const list = data.localidades ?? [];

        return list.filter(
          (localidad) =>
            localidad.categoria === "Entidad" && localidad.nombre !== "Ciudad de Buenos Aires",
        );
      })
      .catch((error: unknown) => {
        localidadesCabaPromise = null;
        throw error;
      });
  }

  return localidadesCabaPromise;
}

export async function findLocalidadCabaByName(value: string) {
  const normalizedValue = normalizeGeorefValue(value);

  if (!normalizedValue) {
    return null;
  }

  const localidades = await getLocalidadesCaba();

  return (
    localidades.find((localidad) => normalizeGeorefValue(localidad.nombre) === normalizedValue) ?? null
  );
}
