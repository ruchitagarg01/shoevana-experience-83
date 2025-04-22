
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false, // Ensure Vite serves files properly
  },
  plugins: [
    react(),
    // Removed the lovable-tagger plugin as it's causing errors
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    port: 5000, // You can change this to any available port
    historyApiFallback: true, // Ensures React Router handles all routes
  },
}));
