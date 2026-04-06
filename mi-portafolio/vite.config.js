import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendors estables — se cachean indefinidamente entre deploys
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-icons": ["react-icons"],
        },
      },
    },
    // Avisar si algún chunk supera 400kb
    chunkSizeWarningLimit: 400,
  },
});
