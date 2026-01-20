import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure root is current directory
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
