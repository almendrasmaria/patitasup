const GEOREF_BASE_URL = "/georef/api";

export type GeorefLocalidad = {
  id: string;
  nombre: string;
  categoria?: string;
};

async function fetchGeoref<T>(
  path: string,
  params: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(`${GEOREF_BASE_URL}${path}`, window.location.origin);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Georef error ${res.status}`);
  return (await res.json()) as T;
}

export async function getLocalidadesCaba(): Promise<GeorefLocalidad[]> {
  const data = await fetchGeoref<{ localidades: GeorefLocalidad[] }>(
    "/localidades",
    {
      provincia: "CABA",
      campos: "id,nombre,categoria",
      orden: "nombre",
      max: 200,
    }
  );

  const list = data.localidades ?? [];

  return list.filter(
    (l) => l.categoria === "Entidad" && l.nombre !== "Ciudad de Buenos Aires"
  );
}
