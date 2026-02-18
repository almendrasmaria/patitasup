import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/georef": {
        target: "https://apis.datos.gob.ar",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});