import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/

//  vite __dirname to ES Modules προσθήκη για να δουλέψει το __dirname (να το θυμάμαι για καθε νέο project με vite (stackoverflow)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/web-project-portfolio-2025-react/",
  plugins: [react()],
  resolve: {
    alias: {
      // __dirname (πρόσθεσα αυτά για να δουλέψει τα alias όπως στο webpack)
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
