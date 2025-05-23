import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Safely handle PORT
const PORT = parseInt(process.env.PORT, 10) || 3000;
console.log("Using port:", PORT);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: PORT,
  },
  preview: {
    host: "0.0.0.0",
    port: PORT,
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: false,
  },
});
