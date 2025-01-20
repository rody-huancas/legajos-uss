import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config" : path.resolve(__dirname, "./src/config"),
      "@docs"   : path.resolve(__dirname, "./src/docs"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@routes" : path.resolve(__dirname, "./src/routes"),
      "@scripts": path.resolve(__dirname, "./src/scripts"),
      "@shared" : path.resolve(__dirname, "./src/shared"),
      "@store"  : path.resolve(__dirname, "./src/store"),
    },
  },
});
