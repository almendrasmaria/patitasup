import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PatitasUp · Adoptá tu próximo mejor amigo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #304543 0%, #243633 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "24px",
              background: "#ff8856",
              fontSize: "48px",
            }}
          >
            🐾
          </div>
          <span style={{ fontSize: "44px", fontWeight: 800, color: "#ffffff" }}>PatitasUp</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Adoptá tu próximo mejor amigo
          </span>
          <span style={{ fontSize: "32px", fontWeight: 400, color: "rgba(255,255,255,0.82)", maxWidth: "880px" }}>
            Conectamos mascotas rescatadas con familias listas para brindar amor.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 600,
              color: "#304543",
              background: "#ff8856",
              padding: "14px 32px",
              borderRadius: "999px",
            }}
          >
            patitasup.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
